import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import { useRouter } from 'expo-router'
import MarkFav from '../BookDetails/MarkFav';

export default function BookListItem({book}) {
    const router=useRouter();
  return (
    <TouchableOpacity 
    onPress={()=>router.push({
        pathname:'/book-details',
        params:book
    })}
    style={{
        marginRight:15,
        marginTop:3,
        padding:18,
        backgroundColor:Colors.WHITE,
        borderRadius:10
    }}>
      <View style={{
        position:'absolute',
        zIndex:10,
        right:18,
        top:19
      }}>
        <MarkFav book={book} color={'white'}/>
      </View>
      <Image source={{uri:book?.imageUrl}} 
      style={{
        width:125,
        height:190,
        objectFit:'cover',
        borderRadius:10,
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
            color:Colors.GRAY,
            fontFamily:'outfit'
        }}>{book?.author}</Text>
      </View>
    </TouchableOpacity>
  )
}