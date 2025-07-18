import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../constants/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { chatsession } from "../../config/AiModal";
import { useRouter } from "expo-router";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";

export default function GenerateBook() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const user = useUser(); // Clerk user hook
  const router = useRouter();
  const { novelName, novelCategory, docId} = route.params || {};

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "AI generator",
      headerTransparent: true,
    });
  }, [navigation]);

  useEffect(() => {
    if (user.isLoaded) {
      GenerateBookAI();
    }
  }, [user.isLoaded]);

  const GenerateBookAI = async () => {
    setLoading(true);

    try {
      const PROMPT = `Write a novel titled "${novelName}" in the "${novelCategory}" category more than 50 line each 7 chapter and give the output in array and dont change the array orders`;
      const result = await chatsession.sendMessage(PROMPT);
      const responseText =result.response.text();
      const BookResult = JSON.parse(responseText);

      // Update the existing document in Firestore
      await updateDoc(doc(db, "AiGenerated", docId), {
        username: user?.user?.fullName ,
        email: user?.user?.primaryEmailAddress?.emailAddress,
        userImage: user?.user?.imageUrl,
        id: docId,
        BookData: BookResult,
      });

      setLoading(false);
      router.push("(tabs)/home");
    } catch (error) {
      console.error("Error generating book:", error);
      setLoading(false);
    }
  };

  if (!user.isLoaded) {
    return (
      <View
        style={{
          backgroundColor: Colors.WHITE,
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, fontFamily: "outfit-medium" }}>
          Loading user data...
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        backgroundColor: Colors.WHITE,
        height: "100%",
        padding: 50,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 35,
          textAlign: "center",
        }}
      >
        Generate Book
      </Text>
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: 20,
          textAlign: "center",
          marginTop: 40,
        }}
      >
        We are working to generate your novels
      </Text>
      <LottieView
        autoPlay
        style={{
          width: 200,
          height: 200,
          left: 40,
          backgroundColor: "#ffff",
        }}
        source={require("./../../assets/lottie/Generate.json")}
      />
      <Text
        style={{
          fontFamily: "outfit",
          color: Colors.GRAY,
          fontSize: 20,
          textAlign: "center",
        }}
      >
        Do not go back
      </Text>
    </View>
  );
}
