import { View, Text } from "react-native";
import React, { useState } from "react";
import Colors from "./../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import StartCreateNewBook from "../Mybooks/StartCreateNewBook";

export default function artificialIntelligence() {
  const [userBook, setUserBook] = useState([]);
  return (
    <View
      style={{
        padding: 25,
        backgroundColor: Colors.BLACK,
        height: "100%",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 20,
            marginTop: 25,
            color:Colors.WHITE
          }}
        >
          CREATE NEW BOOKS WITH AI
        </Text>
        <Ionicons name="add-circle" size={50} color={Colors.WHITE} />
      </View>
      {userBook?.length == 0 ? <StartCreateNewBook/> : null}
    </View>
  );
}
