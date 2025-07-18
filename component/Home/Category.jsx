import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../../config/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Colors from "./../../constants/Colors";
import LottieView from "lottie-react-native";

export default function Category({ category }) {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCatorgy] = useState("Book 1");

  useEffect(() => {
    GetCategories();
  }, []);

  /**
   * Use to get category list from db
   */
  const GetCategories = async () => {
    setCategoryList([]);
    const snapshot = await getDocs(collection(db, "Category"));
    snapshot.forEach((doc) => {
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  return (
    <View style={{ marginTop: 8 }}>
      <View style={styles.headerContainer}>
        <Text style={styles.categoryText}>Category</Text>
        <LottieView
          autoPlay
          loop // Looping the animation for continuous effect
          style={styles.lottieAnimation}
          source={require('./../../assets/lottie/sparkle.json')}
        />
      </View>
      <FlatList
        data={categoryList}
        numColumns={5}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedCatorgy(item.name);
              category(item.name);
            }}
            style={{ flex: 1 }}
          >
            <View
              style={[
                styles.container,
                selectedCategory === item.name && styles.selectedCategoryContainer,
              ]}
            >
              <Image
                source={{ uri: item?.imageUrl }}
                style={styles.categoryImage}
              />
            </View>
            <Text style={styles.categoryName}>
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryText: {
    fontFamily: "outfit-medium",
    fontSize: 20,
    color: Colors.WHITE,
    marginRight: 10, // Space between text and animation
  },
  lottieAnimation: {
    width: 50,
    height: 50,
    right:40,
    bottom:6,
    backgroundColor: 'transparent', // Set background to transparent
  },
  container: {
    backgroundColor: Colors.Light_PRIMARY,
    padding: 5,
    height: 60,
    alignItems: "center",
    borderWidth: 3,
    borderRadius: 15,
    borderColor: Colors.PRIMARY,
    margin: 5,
  },
  selectedCategoryContainer: {
    backgroundColor: Colors.SECONDARY,
    borderColor: Colors.WHITE,
  },
  categoryImage: {
    width: 40,
    height: 40,
  },
  categoryName: {
    textAlign: "center",
    fontFamily: "outfit",
    color:Colors.WHITE,
    marginBottom:15
  },
});
