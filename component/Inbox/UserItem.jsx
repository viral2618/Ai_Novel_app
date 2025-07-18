import { View, Text, Image } from "react-native";
import React from "react";
import Colors from "./../../constants/Colors";
import { Link } from "expo-router";

export default function UserItem({ userInfo }) {
  return (
    <Link href={"/chat?id=" + userInfo.docId}>
      <View
        style={{
          marginVertical: 7,
          display: "flex",
          flexDirection: "row",
          gap: 20,
          alignItems: "center",
          borderRadius: 50,
          borderWidth: 2,
          borderColor: Colors.WHITE,
          width: "100%",
          height: 80,
        }}
      >
        <Image
          source={{ uri: userInfo?.imageUrl }}
          style={{
            height: 50,
            width: 50,
            borderRadius: 99,
            marginBottom: 15,
            left: 10,
            top: 5,
            bottom: 10,
          }}
        />
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 20,
            color: Colors.WHITE,
          }}
        >
          {userInfo?.name}
        </Text>
      </View>
      <View
        style={{
          borderWidth: 0.2,
          marginVertical: 20,
          borderColor: Colors.BLACK,
        }}
      ></View>
    </Link>
  );
}
