import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  where,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./../../config/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import UserItem from "../../component/Inbox/UserItem";
import Colors from "../../constants/Colors";
import LottieView from "lottie-react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Inbox() {
  const { user } = useUser();
  const [userList, setUserList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (user) GetUserList();
  }, [user]);

  const GetUserList = async () => {
    setLoader(true);
    setUserList([]);
    const q = query(
      collection(db, "Chat"),
      where("userIds", "array-contains", user?.primaryEmailAddress.emailAddress)
    );

    const querySnapShot = await getDocs(q);
    const list = [];

    querySnapShot.forEach((docSnap) => {
      const data = docSnap.data();
      list.push({ id: docSnap.id, ...data });
    });

    setUserList(list);
    setLoader(false);
  };

  const deleteMessagesSubcollection = async (chatId) => {
    const messagesRef = collection(db, "Chat", chatId, "Messages");
    const messagesSnapshot = await getDocs(messagesRef);

    const deletePromises = messagesSnapshot.docs.map((messageDoc) =>
      deleteDoc(doc(db, "Chat", chatId, "Messages", messageDoc.id))
    );

    await Promise.all(deletePromises);
  };

  const handleDeleteChat = (chatId) => {
    Alert.alert("Delete Chat", "Are you sure you want to delete this chat?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteMessagesSubcollection(chatId);
            await deleteDoc(doc(db, "Chat", chatId));
            GetUserList();
          } catch (error) {
            console.error("Error deleting chat:", error);
            Alert.alert("Error", "Could not delete chat.");
          }
        },
      },
    ]);
  };

  const MapOtherUserLIst = () => {
    const list = [];
    userList.forEach((record) => {
      const OtherUser = record.user?.filter(
        (u) => u?.email !== user?.primaryEmailAddress?.emailAddress
      );
      if (OtherUser.length > 0) {
        const result = {
          docId: record.id,
          ...OtherUser[0],
        };
        list.push(result);
      }
    });

    return list;
  };

  return (
    <View style={localStyles.container}>
      <Text style={localStyles.title}>Inbox</Text>
      <LottieView
        autoPlay
        loop
        style={localStyles.lottieAnimation}
        source={require("./../../assets/lottie/chat.json")}
      />
      {loader ? (
        <ActivityIndicator size="large" color={Colors.RED} />
      ) : (
        <FlatList
          data={MapOtherUserLIst()}
          refreshing={loader}
          onRefresh={GetUserList}
          style={localStyles.list}
          keyExtractor={(item) => item.docId}
          renderItem={({ item }) => (
            <View style={localStyles.chatWrapper}>
              <UserItem userInfo={item} />
              <TouchableOpacity
                style={localStyles.deleteIcon}
                onPress={() => handleDeleteChat(item.docId)}
              >
                <Ionicons name="trash" size={20} color="white" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const localStyles = {
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
    padding: 20,
  },
  title: {
    fontFamily: "outfit-medium",
    fontSize: 30,
    color: Colors.WHITE,
  },
  list: {
    flex: 1,
    marginTop: -35,
  },
  lottieAnimation: {
    width: 70,
    height: 50,
    left: 75,
    bottom: 48,
    backgroundColor: "transparent",
  },
  chatWrapper: {
    marginBottom: 10,
    position: "relative",
  },
  deleteIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "red",
    padding: 6,
    borderRadius: 20,
    zIndex: 2,
  },
};
