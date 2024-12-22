import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import MarkFav from './MarkFav'

export default function BookInfo({book}) {
  return (
    <View>
      <Image source={{uri:book?.imageUrl}} 
      style={{
        width:'100%',
        height:400,
        objectFit:'cover'
      }}
      />
      <View style={{
        padding:20,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
      }}>
        <View>
            <Text style={{
                fontFamily:'outfit-bold',
                fontSize:27
            }}>{book?.name}</Text>
            <Text style={{
                fontFamily:'outfit-medium',
                fontSize:16,
                color:Colors.GRAY,
            }}>{book?.author}</Text>
        </View>
       <MarkFav book={book}/>
      </View>
    </View>
  )
}