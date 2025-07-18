import React, { useState, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

export default function ReadBook() {
  const navigation = useNavigation(); 
  const { bookData } = useLocalSearchParams();
  const book = JSON.parse(bookData);

  
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePress = () => {
    scale.value = withTiming(1.2, { duration: 150 }, () => {
      scale.value = withTiming(1);
    });

    if (currentChapterIndex < book?.BookData?.chapters.length - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
    }
  };

  const currentChapter = book?.BookData?.chapters?.[currentChapterIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{book?.novelName}</Text>
      <Text style={styles.description}>{book?.novelCategory}</Text>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {currentChapter ? (
          <View style={styles.chapterContainer}>
            <Text style={styles.chapterTitle}>{currentChapter.title}</Text>
            <Text style={styles.chapterContent}>{currentChapter.content}</Text>
          </View>
        ) : (
          <Text style={styles.description}>No chapters available.</Text>
        )}
      </ScrollView>

      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Animated.View style={[styles.buttonInner, animatedStyle]}>
          <Text style={styles.buttonText}>Next Chapter</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  chapterContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  chapterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  chapterContent: {
    fontSize: 16,
    textAlign: "justify",
  },
  button: {
    marginTop: 10,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#007BFF',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  buttonInner: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});