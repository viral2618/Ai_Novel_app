import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function StartCreateNewBook() {
  const router = useRouter();

  return (
    <View
      style={{
        padding: 20,
        marginTop: 50,
        display: "flex",
        alignItems: "center",
        gap: 25,
      }}
    >
      <Ionicons name="book-sharp" size={30} color={Colors.WHITE} />
      <Text
        style={{
          fontSize: 25,
          fontFamily: "outfit-medium",
          color: Colors.WHITE,
        }}
      >
        No Books Created Yet
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontFamily: "outfit",
          textAlign: "center",
          color: Colors.WHITE,
        }}
      >
        Looks like it's time to plan a new book! Get started below.
      </Text>
      <TouchableOpacity
        onPress={() => router.push({
          pathname: "/Create-book/FillUp",
        })}
        style={{
          padding: 15,
          backgroundColor: Colors.Light_PRIMARY,
          borderRadius: 15,
          paddingHorizontal: 30,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 17,
            color: Colors.WHITE,
          }}
        >
          Create a New Book
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push({
          pathname: "/Create-Image/AiImage",
        })}
        style={{
          padding: 15,
          backgroundColor: Colors.Light_PRIMARY,
          borderRadius: 15,
          paddingHorizontal: 30,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 17,
            color: Colors.WHITE,
          }}
        >
          Create a New Image for Book 
        </Text>
      </TouchableOpacity>
    </View>
  );
}
