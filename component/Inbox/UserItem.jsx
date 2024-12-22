import { View, Text, Image } from "react-native";
import React from "react";
import Colors from './../../constants/Colors'
import { Link } from "expo-router";

export default function UserItem({ userInfo }) {
  return (
    <Link href={'/chat?id='+userInfo.docId}>
      <View
        style={{
          marginVertical: 7,
          display: "",
          flexDirection: "row",
          gap: 20,
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: userInfo?.imageUrl }}
          style={{
            height: 50,
            width: 50,
            borderRadius: 99,
            marginBottom:15
          }}
        />
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 20,
          }}
        >
          {userInfo?.name}
        </Text>
      </View>
      <View
        style={{
          borderWidth: 0.2,
          marginVertical:7,
          borderColor:Colors.GRAY,
        }}
      ></View>
    </Link>
  );
}
