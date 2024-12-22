import { View, Image, ScrollView, ActivityIndicator, StyleSheet, TouchableOpacity, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router"; // Assuming you're using expo-router
import Colors from "../../constants/Colors";

export default function NovelsLayout() {
  const [novels, setNovels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchNovels = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=novels&key=${process.env.EXPO_PUBLIC_GOOGLE_BOOKS_API_KEY}`
        );
        const data = await response.json();
        if (response.ok) {
          setNovels(data.items || []);
        } else {
          setError("Failed to load novels.");
        }
      } catch (error) {
        setError("An error occurred while fetching novels.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNovels();
  }, []);

  const handleBookPress = (bookId) => {
    // Navigate to the BookDetail page
    navigation.push("/BookDetail", { bookId });
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />}
      {error && <Text style={styles.errorText}>{error}</Text>}

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {novels.map((novel, index) => (
          <TouchableOpacity
            key={index}
            style={styles.imageCard}
            onPress={() => handleBookPress(novel.id)} // Navigate to the detail page
          >
            {/* Display Book Image */}
            {novel.volumeInfo.imageLinks && novel.volumeInfo.imageLinks.thumbnail ? (
              <Image
                source={{ uri: novel.volumeInfo.imageLinks.thumbnail }}
                style={styles.novelImage}
              />
            ) : (
              <Text>No image available</Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.WHITE,
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  imageCard: {
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5, // For Android shadow
  },
  novelImage: {
    width: 120,
    height: 180,
    borderRadius: 8,
  },
});
