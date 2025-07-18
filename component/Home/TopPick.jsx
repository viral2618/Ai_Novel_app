import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../constants/Colors";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

export default function TopPick() {
  const [BookList, setBookList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    TopPicks();
  }, []);

  const TopPicks = async () => {
    const snapshot = await getDocs(collection(db, "TopPicks"));
    const books = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setBookList(books);
  };

  const handlePress = (book) => {
    navigation.navigate("AiBookRead/BookDetail", { book });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Picks</Text>
      <LottieView
        autoPlay
        loop
        style={styles.lottieAnimation}
        source={require("./../../assets/lottie/toppick.json")}
      />
      <View style={styles.flatListContainer}>
        <FlatList
          data={BookList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePress(item)}>
              <View style={styles.card}>
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: item?.imageUrl }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </View>
                <Text style={styles.bookTitle}>{item?.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
}



export const styles = StyleSheet.create({
  container: {
    marginTop: 18,
    paddingHorizontal: 10,
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
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // For Android shadow
  },
  imageContainer: {
    overflow: "hidden",
    borderRadius: 5,
  },
  image: {
    height: 180,
    width: 100,
  },
  bookTitle: {
    marginTop: 10,
    right: 28,
    color: Colors.WHITE,
    textAlign: "center",
    fontWeight: "600",
  },
  lottieAnimation: {
    width: 70,
    height: 50,
    left: 128,
    bottom: 55,
    backgroundColor: "transparent",
  },
  flatListContainer: {
    marginTop: -40, // Adjusted positioning instead of negative margin on FlatList
  }
})