import { View, Text, Image, Pressable } from "react-native";
import React, { useCallback, useEffect } from "react";
import * as WebBrowser from 'expo-web-browser';
import { useOAuth } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';
import Colors from '../../constants/Colors';
import { useRouter } from "expo-router";

export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Warm up the android browser to improve UX
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function Page() {
  const router = useRouter();
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/(tabs)/home', { scheme: 'myapp' }),
      });

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive({ session: createdSessionId });
        router.replace('/(tabs)/home');
      } else {
        // Handle signIn or signUp for next steps, such as MFA
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  }, [startOAuthFlow, router]);

  return (
    <View style={{
        backgroundColor: Colors.WHITE,
        height: '100%',
        flex: 1,
    }}>
      <Image
        source={require("./../../assets/images/login.png")}
        style={{
          width: "100%",
          height: 550,
        }}
      />
      <View style={{ padding: 20, display: "flex", alignItems: "center" }}>
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 20,
            textAlign: "center",
          }}
        >
          Ready to Read Books
        </Text>
        <Text
          style={{ fontFamily: "outfit", fontSize: 18, textAlign: "center", color: Colors.GRAY }}
        >
          Let's read the book you like and make life happy again.
        </Text>
        <Pressable 
          onPress={onPress}
          style={{
              padding: 14,
              marginTop: 50,
              backgroundColor: Colors.PRIMARY,
              width: '100%',
              borderRadius: 14
          }}>
            <Text style={{ fontFamily: 'outfit-medium', fontSize: 20, textAlign: 'center', color: Colors.WHITE }}>
              Get Started
            </Text>
        </Pressable>
      </View>
    </View>
  );
}
