import { View, Text, ScrollView, } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";


export default function Readbooks() {
  const book=useLocalSearchParams();
  const navigation = useNavigation();


  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerTransparent: true,
    });
  }, [navigation]);

  return (

   <ScrollView style={{
    padding:20,
   }}>
  <Text style={{
    marginTop:50,
    fontFamily:'outfit-bold',
    fontSize:30,
  }}>{book?.name}</Text>
  <Text style={{
    marginBottom:10,
    fontFamily:'outfit-medium',
    fontSize:20
  }}>{book?.category}</Text>
  <Text style={{
    fontFamily:'outfit',
    fontSize:16.7,
    marginBottom:50,
  }}>
    {book?.Reading}
  </Text>
   </ScrollView>
  );
}
