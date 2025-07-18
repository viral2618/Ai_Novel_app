import { View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import Category from './Category';
import { collection, getDocs, query, where, doc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import BookListItem from './BookListItem';
import { useUser } from "@clerk/clerk-expo"; 

export default function BookListCategory() {
  const [bookList, setBookList] = useState([]);
  const [loader, setLoader] = useState(false);
  const { user } = useUser(); 

  useEffect(() => {
    setLoader(true);
    GetBookList('Fiction');
  }, []);

  /**
   * Fetch books based on category selection
   */
  const GetBookList = async (category) => {
    setLoader(true); 
    const q = query(collection(db, 'Books'), where('category', '==', category));
    const querySnapShot = await getDocs(q);

   
    const books = querySnapShot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    setBookList(books);
    setLoader(false); 
  };

  /**
   * Handle book click to update `lastReadAt` and add book ID to Firestore
   */
  const handleBookClick = async (bookId) => {
    if (!user) return; 
    try {
      const bookRef = doc(db, "Books", bookId);
      const userRef = doc(db, "Users", user.id); 

      
      await updateDoc(bookRef, {
        lastReadAt: serverTimestamp(),
      });

      // Add book ID to user's readBooks array
      await updateDoc(userRef, {
        readBooks: arrayUnion(bookId),
      });

      console.log("Book read timestamp updated & added to user's readBooks list!");
    } catch (error) {
      console.error("Error updating lastReadAt:", error);
    }
  };

  return (
    <View>
      <Category category={(value) => GetBookList(value)} />
      <FlatList
        data={bookList}
        horizontal={true}
        refreshing={loader}
        onRefresh={() => GetBookList('Book 1')}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <BookListItem book={item} onPress={() => handleBookClick(item.id)} />
        )}
      />
    </View>
  );
}
