import { View, Text, FlatList, Pressable,StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { query } from "firebase/database";
import { collection, deleteDoc, doc, getDocs, where } from "firebase/firestore";
import { useUser } from "@clerk/clerk-expo";
import { db } from "../../config/FirebaseConfig";
import BookListItem from "./../../component/Home/BookListItem";
import Colors from "../../constants/Colors";

export default function UserPost() {
  const navigation = useNavigation();
  const { user } = useUser();
  const[loader,setLoader]=useState(false);
  const [userPost, setUserPost] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "User Post",
    });
    user && GetUserPost();
  }, [user]);

  /**
   * used to get user post
   */

  const GetUserPost = async () => {
    setLoader(true);
    setUserPost([]);
    const q = query(
      collection(db, "Books"),
      where("email", "==", user?.primaryEmailAddress?.emailAddress)
    );
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      console.log(doc.data());
      setUserPost((prev) => [...prev, doc.data()]);
    });
    setLoader(false)
  };

  const onDeletePost=(docId)=>{
    Alert.alert('Do you want to delete','Do you really want to delete this post',[
        {
            text:'Cancel',
            onPress:()=>console.log("cancel click"),
            style:'cancel'
        },
        {
            text:'Yes',
            onPress:()=>deletePost(docId)
        }
    ])
  }

  const deletePost=async(docId)=>{
    await deleteDoc(doc(db,'Books',docId));
    GetUserPost();
  }
  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: 30,
          marginTop:-15
        }}
      >
        User Post
      </Text>
      <FlatList
        data={userPost}
        numColumns={2}
        refreshing={loader}
        onRefresh={GetUserPost}
        renderItem={({ item, index }) => (
          <View>
            <BookListItem book={item} key={index} />
            <Pressable
            onPress={()=>onDeletePost(item?.id)}
            style={styles.deleteButton}>
                <Text style={{
                    fontFamily:'outfit',
                    textAlign:'center',
                }}>Delete</Text>
            </Pressable>
          </View>
        )}
      />
      {userPost?.length==0 &&<Text>No Post Found </Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  deleteButton:{
    backgroundColor:Colors.Light_PRIMARY,
    padding:5,
    borderRadius:7,
    marginTop:5,
    marginRight:10
  }
})

