import { useUser } from "@clerk/clerk-expo";
import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";

export default function Index() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => {
        if (user) {
          router.replace("/(tabs)/home");
        } else {
          router.replace("/login");
        }
      }, 1500); // Smooth delay for better UX

      setTimeout(() => {
        setLoading(false);
      }, 2000); // Ensure Lottie runs long enough
    }
  }, [isLoaded, user, router]);

  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        loop
        style={styles.lottieAnimation}
        source={require("./../assets/lottie/SplashScreen.json")}
      />
      <Text style={styles.title}>Friction Forge</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  lottieAnimation: {
    width: "120%",
    height: "120%",
    position: "absolute",
  },
  title: {
    fontFamily: "outfit-medium",
    fontSize: 30,
    textAlign: "center",
    color: Colors.BLACK,
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 18,
    color: Colors.GRAY,
    textAlign: "center",
    marginTop: 10,
  },
});
