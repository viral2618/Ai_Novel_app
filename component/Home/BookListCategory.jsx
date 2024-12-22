import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Category from './Category'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'
import BookListItem from './BookListItem'

export default function BookListCategory() {


  const [bookList,setBookList]=useState([]);
  const[loader,setLoader]=useState(false);
  useEffect(()=>{
    setLoader(true);
    GetBookList('Book 1');
  },[])

  /**
   * 
   * used to get book list on category select
   */
  const GetBookList=async(category)=>{
    setBookList([]);
     const q=query(collection(db,'Books'),where('category','==',category));
     const querySnapShot=await getDocs(q);
     querySnapShot.forEach(doc=>{
      setBookList(bookList=>[...bookList,doc.data()])
     }
     )
     setLoader(false);
  }
  return (
    <View>
      <Category category={(value)=>GetBookList(value)}/>
        <FlatList 
        data={bookList}
        horizontal={true}
        refreshing={loader}
        onRefresh={()=>GetBookList('Book 1')}
        renderItem={({item,index})=>(
          <BookListItem book={item}/>
        )}
        />
    </View>
  )
}