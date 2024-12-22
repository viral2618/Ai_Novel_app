import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import BookInfo from "../../component/BookDetails/BookInfo";
import BookSubInfo from "../../component/BookDetails/BookSubInfo";
import AboutBook from "../../component/BookDetails/AboutBook";
import AuthorInfo from "../../component/BookDetails/AuthorInfo";
import Colors from "../../constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";

export default function BookDetails() {
  const book = useLocalSearchParams();
  const navigation = useNavigation();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);

  const InitiateChat = async () => {
    const docId1 = user?.primaryEmailAddress?.emailAddress + "_" + book?.email;
    const docId2 = book?.email + "_" + user?.primaryEmailAddress?.emailAddress;

    const q = query(
      collection(db, "Chat"),
      where("id", "in", [docId1, docId2])
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      router.push({
        pathname: "/chat",
        params: { id: doc.id }
      });
    });
    if (querySnapshot.docs?.length === 0) {
      await setDoc(doc(db, "Chat", docId1), {
        id: docId1,
        user: [
          {
            email: user?.primaryEmailAddress?.emailAddress,
            imageUrl: user?.imageUrl,
            name: user?.fullName,
          },
          {
            email: book?.email,
            imageUrl: book?.userImage,
            name: book?.username,
          }
        ],
        userIds: [user?.primaryEmailAddress?.emailAddress, book?.email]
      });
      router.push({
        pathname: "/chat",
        params: { id: docId1 },
      });
    }
    
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <BookInfo book={book} />
        <BookSubInfo book={book} />
        <AboutBook book={book} />
        <AuthorInfo book={book} />

      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          onPress={()=>router.push({
            pathname:'/Read-books/readbook',
            params:book
          })} 
          style={styles.readBtn}
          accessibilityLabel="Read Books"
        >
          <Text style={styles.buttonText}>Read Books</Text>
        </TouchableOpacity>
    </View>
    <View style={styles.buttonContainer}>
        <TouchableOpacity 
          onPress={InitiateChat} 
          style={styles.readBtn}
          accessibilityLabel="Read Books"
        >
          <Text style={styles.buttonText}>Message to Author</Text>
        </TouchableOpacity>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  buttonContainer: {
    width: "100%",
    bottom:2,
    alignItems: 'center',
    justifyContent: 'space-between', // Ensures space between buttons
  },
  readBtn: {
    padding: 8,
    backgroundColor: Colors.PRIMARY,
    justifyContent: 'center',
    width: '100%', // Full width for buttons
    marginTop:5,
    borderRadius:40,
  },
  buttonText: {
    fontFamily: "outfit-medium",
    fontSize: 20,
    textAlign: "center",
  },
});