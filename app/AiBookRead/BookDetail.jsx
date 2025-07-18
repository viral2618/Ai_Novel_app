import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function BookDetail() {
  const route = useRoute();
  const { book } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: book.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{book.name}</Text>
      <Text style={styles.description}>{book.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#ccc",
    lineHeight: 22,
  },
});
