import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function AuthorInfo({ book }) {
  return (
    <View style={styles.container}>
      <View style={{
        display:'flex',
        flexDirection:'row',
        gap:20,
      }}>
        
        <Image
          source={{ uri: book?.userImage}}
          style={{
            width: 50,
            height: 50,
            borderRadius: 99,
          }}
        />
        <View>
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 16,
            }}
          >
            {book?.username}
          </Text>
          <Text
            style={{
              fontFamily: "outfit",
              color: Colors.GRAY,
            }}
          >
            {book?.author}
          </Text>
        </View>
      </View>
      <Ionicons name="send-sharp" size={24} color={Colors.PRIMARY}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    backgroundColor: Colors.WHITE,
    justifyContent:'space-between',
    borderColor:Colors.PRIMARY
  },
});
