import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../constants/Colors";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";

export default function AiGenerated() {
  const router = useRouter();
  const [BookList, setBookList] = useState([]);

  useEffect(() => {
    TopPicks();
  }, []);

  const TopPicks = async () => {
    const snapshot = await getDocs(collection(db, "AiGenerated"));
    const books = snapshot.docs.map((doc) => ({
      id: doc.id, 
      ...doc.data(),
    }));
    setBookList(books);
  };

  const handlePress = (book) => {
    router.push({
      pathname: "/AiBookRead/AiReadBook", 
      params: { bookData: JSON.stringify(book) }, 
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePress(item)} style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item?.coverImage || "default_image_url" }} // Fallback to a default image
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.bookTitle}>{item?.novelName || "Untitled"}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ marginTop: 18 }}>
      <Text style={styles.title}>AI Generated Books</Text>
      <View
        style={{
          bottom: 50,
        }}
      >
        <LottieView
          autoPlay
          loop
          style={styles.lottieAnimation}
          source={require("../../assets/lottie/toppick.json")}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={BookList}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()} // Ensure the id is a string
        />
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  title: {
    fontSize: 30,
    color: Colors.WHITE,
    marginBottom: 10,
    fontWeight: "bold",
  },
  card: {
    padding: 10,
    marginBottom: 10,
    marginRight: 15,
    backgroundColor: Colors.Light_PRIMARY,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.GOLDENl,
    alignItems: "center",
    width: "45%",
  },
  imageContainer: {
    overflow: "hidden",
    borderRadius: 5,
  },
  image: {
    height: 180,
    width: 120,
  },
  bookTitle: {
    marginTop: 10,
    color: Colors.WHITE,
    textAlign: "center",
    fontWeight: "600",
  },
  lottieAnimation: {
    width: 70,
    height: 50,
    alignSelf: "flex-end",
    marginBottom: -40,
  },
});
