import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constants/Colors'

export default function AboutBook({book}) {
    const[readMore,setReadMore]=useState(true);

  return (
    <View style={{
        padding:20
    }}>
      <Text
      style={{
        fontFamily:'outfit-medium',
        fontSize:20,
      }}
      >About{book?.name}</Text>
      <Text 
      numberOfLines={readMore?3:20}
      style={{
        fontFamily:'outfit',
        fontSize:14,
        color:Colors.GRAY
      }}>{book?.about}</Text>

      {readMore&& 
      <Pressable onPress={()=>setReadMore(false)}>
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:14,
        color:Colors.SECONDARY
      }}>Read More</Text></Pressable>}
    </View>
  )
}