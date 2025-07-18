import {
  Text,
  StyleSheet,
} from "react-native";
import React from "react";
import Header from "../../component/Home/Header";
import Slider from "../../component/Home/Slider";
import BookListCategory from "../../component/Home/BookListCategory";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../../constants/Colors";
import { Link } from "expo-router";
import TopPick from "../../component/Home/TopPick";
import { ScrollView } from 'react-native-virtualized-view';
import AiGeneratedBook from "../../component/Home/AiGeneratedBook";

export default function Home() {
  return (
    <ScrollView style={styles.container}>
      <Header />
      <Slider />
      <BookListCategory />
      <TopPick />
      <AiGeneratedBook/>
      <Link href="/add-new-book" style={styles.addNewBookContainer}>
      <Ionicons name="book" size={24} color={Colors.WHITE} />
      <Text style={styles.addNewBookText}>Add New Book</Text>
    </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.BLACK,
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  addNewBookContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: Colors.Light_PRIMARY,
    borderWidth: 2,
    borderColor: Colors.WHITE,
    borderRadius: 20,
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 20,
    marginHorizontal: 20,
    justifyContent: "center",
  },
  addNewBookText: {
    fontFamily: "outfit-medium",
    color: Colors.WHITE,
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "600",
  },
});
