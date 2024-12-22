import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, Button, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router"; // For navigation in expo-router

export default function BookDetail() {
  const [bookDetails, setBookDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { bookId } = router.query; // Get the bookId from the URL params

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${process.env.EXPO_PUBLIC_GOOGLE_BOOKS_API_KEY}`
        );
        const data = await response.json();
        if (response.ok) {
          setBookDetails(data);
        } else {
          setError("Failed to load book details.");
        }
      } catch (error) {
        setError("An error occurred while fetching book details.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  const handleReadBook = () => {
    if (bookDetails?.accessInfo?.epub?.acsTokenLink) {
      // If there's a link to the ePub version, open it in a browser
      Linking.openURL(bookDetails.accessInfo.epub.acsTokenLink);
    } else if (bookDetails?.accessInfo?.pdf?.acsTokenLink) {
      // If there's a link to the PDF version, open it in a browser
      Linking.openURL(bookDetails.accessInfo.pdf.acsTokenLink);
    } else {
      alert("This book is not available for reading directly.");
    }
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {bookDetails && (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Book Image */}
          {bookDetails.volumeInfo.imageLinks && bookDetails.volumeInfo.imageLinks.thumbnail ? (
            <Image
              source={{ uri: bookDetails.volumeInfo.imageLinks.thumbnail }}
              style={styles.bookImage}
            />
          ) : (
            <Text>No image available</Text>
          )}

          {/* Book Title */}
          <Text style={styles.bookTitle}>{bookDetails.volumeInfo.title}</Text>

          {/* Book Authors */}
          {bookDetails.volumeInfo.authors && (
            <Text style={styles.bookAuthor}>
              <Text style={styles.boldText}>Author(s): </Text>
              {bookDetails.volumeInfo.authors.join(", ")}
            </Text>
          )}

          {/* Book Publisher */}
          {bookDetails.volumeInfo.publisher && (
            <Text style={styles.bookPublisher}>
              <Text style={styles.boldText}>Publisher: </Text>
              {bookDetails.volumeInfo.publisher}
            </Text>
          )}

          {/* Book Published Date */}
          {bookDetails.volumeInfo.publishedDate && (
            <Text style={styles.bookPublishedDate}>
              <Text style={styles.boldText}>Published on: </Text>
              {bookDetails.volumeInfo.publishedDate}
            </Text>
          )}

          {/* Book Description */}
          {bookDetails.volumeInfo.description && (
            <Text style={styles.bookDescription}>
              <Text style={styles.boldText}>Description: </Text>
              {bookDetails.volumeInfo.description}
            </Text>
          )}

          {/* Read Book Button */}
          <Button title="Read the Book" onPress={handleReadBook} />

          {/* Other information */}
          {bookDetails.volumeInfo.infoLink && (
            <Text style={styles.linkText} onPress={() => Linking.openURL(bookDetails.volumeInfo.infoLink)}>
              Learn more about this book
            </Text>
          )}
        </ScrollView>
      )}
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  bookImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  bookTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  bookAuthor: {
    fontSize: 18,
    marginBottom: 10,
  },
  bookPublisher: {
    fontSize: 16,
    marginBottom: 10,
  },
  bookPublishedDate: {
    fontSize: 16,
    marginBottom: 10,
  },
  bookDescription: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  boldText: {
    fontWeight: "bold",
  },
  linkText: {
    color: "#1e90ff",
    marginTop: 20,
    textDecorationLine: "underline",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
