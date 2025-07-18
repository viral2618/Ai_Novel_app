import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import { useRouter } from 'expo-router'
import MarkFav from '../BookDetails/MarkFav';

export default function BookListItem({book}) {
    const router=useRouter();
  return (
    <ScrollView>
    <TouchableOpacity 
    onPress={()=>router.push({
        pathname:'/book-details',
        params:book
    })}
    style={{
        marginRight:15,
        padding:15,
        backgroundColor:Colors.Light_PRIMARY,
        borderRadius:10,
        borderWidth:2,
        borderColor:Colors.BLUE,
    }}>
      <View style={{
        position:'absolute',
        zIndex:10,
        right:22,
        top:24
      }}>
        <MarkFav book={book} color={'white'}/>
      </View>
      <Image source={{uri:book?.imageUrl}} 
      style={{
        width:125,
        height:190,
        objectFit:'cover',
        borderRadius:10,
        borderWidth:5,
        borderColor:Colors.WHITE,
      }}
      />
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:18,
        marginTop:7,
      }}>{book?.name}</Text>
      <View style={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
      }}>
        <Text style={{
            color:Colors.WHITE,
            fontFamily:'outfit'
        }}>{book?.author}</Text>
      </View>
    </TouchableOpacity>
    </ScrollView>
  )
}