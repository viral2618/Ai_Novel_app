import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import * as Speech from "expo-speech";
import Colors from "../../constants/Colors";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Readbooks() {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const book = useLocalSearchParams();
  const [loader, setLoader] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speechQueue, setSpeechQueue] = useState([]);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);

  const chapters = useMemo(() => {
    return Object.keys(book)
      .filter((key) => key.toLowerCase().startsWith("chapter"))
      .sort((a, b) => {
        const numA = parseInt(a.replace(/[^0-9]/g, ""));
        const numB = parseInt(b.replace(/[^0-9]/g, ""));
        return numA - numB;
      })
      .map((key) => book[key]);
  }, [book]);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
    loadBookmark();
  }, []);

  const saveBookmark = async () => {
    try {
      let chapter = currentChapter;
      let chunkIndex = currentChunkIndex;

      if (speechQueue.length && speechQueue[currentChunkIndex]) {
        chapter = speechQueue[currentChunkIndex].chapterIndex;
      }

      const bookmarkData = {
        chapter,
        chunkIndex,
      };

      await AsyncStorage.setItem(`bookmark_${book?.id}`, JSON.stringify(bookmarkData));
    } catch (error) {
      console.error("Failed to save bookmark", error);
    }
  };

  const loadBookmark = async () => {
    try {
      const value = await AsyncStorage.getItem(`bookmark_${book?.id}`);
      if (value !== null) {
        const { chapter, chunkIndex } = JSON.parse(value);
        setCurrentChapter(chapter);
        setCurrentChunkIndex(chunkIndex);
      }
    } catch (error) {
      console.error("Failed to load bookmark", error);
    }
  };

  const handleTextToSpeech = () => {
    let allChunks = [];
    for (let i = currentChapter - 1; i < chapters.length; i++) {
      const chunks = chunkText(chapters[i]).map((chunk) => ({
        chapterIndex: i + 1,
        text: chunk,
      }));
      allChunks = allChunks.concat(chunks);
    }
    setSpeechQueue(allChunks);
    const startFrom = isPaused ? currentChunkIndex : 0;
    setCurrentChunkIndex(startFrom);
    setIsSpeaking(true);
    setIsPaused(false);
    speakChunk(allChunks[startFrom]);
  };

  const speakChunk = (chunk) => {
    Speech.speak(chunk.text, {
      language: "en-US",
      pitch: 1.5,
      rate: 0.9,
      onDone: handleNextChunk,
    });

    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    setCurrentChapter(chunk.chapterIndex);
  };

  const handleNextChunk = () => {
    const nextIndex = currentChunkIndex + 1;
    if (nextIndex < speechQueue.length) {
      setCurrentChunkIndex(nextIndex);
      speakChunk(speechQueue[nextIndex]);
    } else {
      setIsSpeaking(false);
      saveBookmark();
    }
  };

  const handleStopSpeech = () => {
    Speech.stop();
    setIsSpeaking(false);
    setIsPaused(false);
    setSpeechQueue([]);
    saveBookmark();
  };

  const chunkText = (text) => {
    const maxLength = 1000000000000000000000000000; 
    const chunks = [];
    for (let i = 0; i < text.length; i += maxLength) {
      chunks.push(text.slice(i, i + maxLength));
    }
    return chunks;
  };

  const handleNextChapter = () => {
    handleStopSpeech();
    if (currentChapter < chapters.length) {
      setCurrentChapter((prev) => prev + 1);
      setCurrentChunkIndex(0);
    }
  };

  const handlePreviousChapter = () => {
    handleStopSpeech();
    if (currentChapter > 1) {
      setCurrentChapter((prev) => prev - 1);
      setCurrentChunkIndex(0);
    }
  };

  return (
    <ScrollView ref={scrollViewRef} style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.bookmarkContainer}>
          <TouchableOpacity onPress={saveBookmark}>
            <Icon name="bookmark" size={30} color={Colors.GOLDENl} />
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>{book?.name}</Text>
        <Text style={styles.category}>{book?.category}</Text>
        <Text style={styles.chapterHeader}>Chapter {currentChapter}</Text>
        <Text style={styles.readingText}>
          {chapters[currentChapter - 1]}
        </Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.startStopButton}
            onPress={handleTextToSpeech}
            disabled={isSpeaking}
          >
            <Icon name="play" size={30} color="#fff" />
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.startStopButton}
            onPress={handleStopSpeech}
            disabled={!isSpeaking}
          >
            <Icon name="stop" size={30} color="#fff" />
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.navigationButtons}>
          <TouchableOpacity
            style={[styles.navButton, { marginRight: 5 }]}
            disabled={currentChapter === 1}
            onPress={handlePreviousChapter}
          >
            <Icon name="chevron-back" size={25} color="#fff" />
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navButton, { marginLeft: 5 }]}
            disabled={currentChapter === chapters.length || loader}
            onPress={handleNextChapter}
          >
            {loader ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <Text style={styles.buttonText}>Next</Text>
                <Icon name="chevron-forward" size={25} color="#fff" />
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    margin: 15,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 30,
  },
  bookmarkContainer: {
    alignItems: "flex-end",
    marginBottom: 15,
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: 32,
    color: "#333",
    marginBottom: 10,
  },
  category: {
    fontFamily: "outfit-medium",
    fontSize: 18,
    color: "#555",
    marginBottom: 15,
  },
  chapterHeader: {
    fontFamily: "outfit-bold",
    fontSize: 24,
    color: "#444",
    marginBottom: 15,
  },
  readingText: {
    fontFamily: "outfit",
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
    marginBottom: 30,
    textAlign: "justify",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: -30,
  },
  startStopButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: Colors.GOLDENl,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginHorizontal: 10,
  },
  buttonText: {
    fontFamily: "outfit-medium",
    color: "#fff",
    fontSize: 16,
    marginLeft: 8,
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  navButton: {
    backgroundColor: Colors.GOLDENl,
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});