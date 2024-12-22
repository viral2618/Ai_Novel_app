import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import { useRouter } from 'expo-router';

export default function StartCreateNewBook() {

    const router=useRouter();
  return (
    <View style={{
        padding:20,
        marginTop:50,
        display:'flex',
        alignItems:'center',
        gap:25
    }}>
     <Ionicons name="book-sharp" size={30} color={Colors.PRIMARY} />
     <Text style={{
        fontSize:25,
        fontFamily:'outfit-medium',
     }}>
        No Books Create Yet
     </Text>
     <Text style={{
        fontSize:20,
        fontFamily:'outfit',
        textAlign:'center',
        color:Colors.GRAY
     }}>
       Looks Like Its time to Plan a New Book!Get Started Below
     </Text>
     <TouchableOpacity 
     onPress={()=>router.push('/Create-book/search-place')}
     style={{
        padding:15,
        backgroundColor:Colors.PRIMARY,
        borderRadius:15,
        paddingHorizontal:30
     }}>
        <Text style={{
            fontFamily:'outfit-medium',
            fontSize:17,
        }}>
            Ceate a New Book
        </Text>
     </TouchableOpacity>
    </View>
  )
}