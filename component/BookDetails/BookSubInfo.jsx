import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import BookSubInfoCard from './BookSubInfoCard';

const Star = ({ filled, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Image
      source={
        filled
          ? require('./../../assets/images/star_filled.png')
          : require('./../../assets/images/star_empty.png')
      }
      style={{ width: 20, height: 20, marginHorizontal: 2 }}
    />
  </TouchableOpacity>
);

export default function BookSubInfo({ book }) {
  const [userRating, setUserRating] = useState(book?.rating || 0);

  useEffect(() => {
    if (!book) {
      console.warn('⚠ Book is undefined in BookSubInfo');
    } 

    // Retrieve the saved rating from AsyncStorage when the component mounts
    const getRating = async () => {
      try {
        const savedRating = await AsyncStorage.getItem(`rating_${book.id}`);
        if (savedRating !== null) {
          setUserRating(parseInt(savedRating)); // Set the rating from AsyncStorage
        }
      } catch (error) {
        console.error('Error loading rating from AsyncStorage', error);
      }
    };

    if (book?.id) {
      getRating(); 
    }
  }, [book]);

  const saveRating = async (rating) => {
    try {
      await AsyncStorage.setItem(`rating_${book.id}`, rating.toString()); // Save the rating with the unique book ID
      console.log(`Saved rating for book ${book.id}: ${rating}`);
    } catch (error) {
      console.error('Error saving rating to AsyncStorage', error);
    }
  };

  const renderStars = () => (
    <View style={{ alignItems: 'center' }}>
      {/* Star Row */}
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            filled={i < userRating}
            onPress={() => {
              const newRating = i + 1;
              setUserRating(newRating);
              saveRating(newRating); 
              console.log(`You rated this book ${newRating} stars`);
            }}
          />
        ))}
      </View>

      {/* Rating Text */}
      <Text style={{ marginTop: 5, fontSize: 14, color: '#444' }}>
        {userRating.toFixed(1)} / 5
      </Text>
    </View>
  );

  if (!book || typeof book !== 'object') {
    return (
      <View style={{ padding: 20 }}>
        <Text>No book data available.</Text>
      </View>
    );
  }

  return (
    <View style={{ paddingHorizontal: 20 }}>
      <BookSubInfoCard
        icon={require('./../../assets/images/genre.png')}
        title="Genre"
        value={book.category || 'N/A'}
      />
      <BookSubInfoCard
        icon={require('./../../assets/images/calander.png')}
        title="Published"
        value={book.publishDate || 'N/A'}
      />
      <BookSubInfoCard
        icon={require('./../../assets/images/languages.png')}
        title="Language"
        value={book.language || 'N/A'}
      />

      {/* Rating Section */}
      <View style={{ marginTop: 15 }}>
        <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Rating:</Text>
        {renderStars()}
      </View>
    </View>
  );
}