import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import Header from '../../component/Home/Header';
import Slider from '../../component/Home/Slider';
import BookListCategory from '../../component/Home/BookListCategory';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />
      
      {/* Slider */}
      <Slider />
      
      {/* Book List + Category */}
      <BookListCategory />
      
      {/* Add New Books */}
      <Link href={'/add-new-book'} style={styles.addNewBookContainer}>
        <Ionicons name="book" size={24} color={Colors.PRIMARY} />
        <Text style={styles.addNewBookText}>Add New Book</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE, // Ensure background color is set
    padding: 15, // Add padding for better spacing
  },
  addNewBookContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: Colors.Light_PRIMARY,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 15,
    borderStyle: 'dashed',
    justifyContent: 'center',
  },
  addNewBookText: {
    fontFamily: 'outfit-medium',
    color: Colors.PRIMARY,
    fontSize: 18,
    marginBottom:40
  },
});