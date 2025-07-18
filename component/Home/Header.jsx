import { View, Text, Image } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import Colors from "../../constants/Colors";

export default function Header() {
  const { user } = useUser();
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 18,
            marginTop: 5,
            color:Colors.WHITE,
          }}
        >
          Welcome,
        </Text>
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 25,
            color:Colors.WHITE,
          }}
        >
          {user?.fullName}
        </Text>
      </View>
      <Image
        source={{ uri: user?.imageUrl }}
        style={{
          width: 40,
          height: 40,
          borderRadius: 99,
          borderWidth:2.5,
          borderColor:Colors.WHITE,
          color:Colors.WHITE,
        }}
      />
    </View>
  );
}
