import { View, Text, FlatList, Image ,StyleSheet, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from '../../config/FirebaseConfig'
import { collection, getDocs } from 'firebase/firestore';
import Colors from './../../constants/Colors'

export default function Category({category}) {

    const [categoryList,setCategoryList]=useState([]);
    const[selectedCategory,setSelectedCatorgy]=useState('Book 1');
    useEffect(()=>{
        GetCategories();
    },[])

    /**
     * usee to get category list from db
     */
    const GetCategories=async()=>{
        setCategoryList([]);
        const snapshot=await getDocs(collection(db,'Category'));
        snapshot.forEach((doc)=>{
            setCategoryList(categoryList=>[...categoryList,doc.data()])
        })
    }
  return (
    <View style={{
        marginTop:15
    }}>
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:20,
      }}>Category</Text>
      <FlatList 
      data={categoryList}
      numColumns={5}
      renderItem={({item})=>(
        <TouchableOpacity 
        onPress={()=>{setSelectedCatorgy(item.name);
          category(item.name)
        }}
        style={{
            flex:1,
        }}>
        <View style={[styles.container,
            selectedCategory==item.name&&styles.selectedCategoryContainer
        ]}> 
            <Image source={{uri:item?.imageUrl}} 
            style={{
                width:40,
                height:40,
            }}
            />
            </View>
            <Text style={{
                textAlign:'center',
                fontFamily:'outfit',
            }}>{item?.name}</Text>
        </TouchableOpacity>
      )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:Colors.Light_PRIMARY,
    padding:5,
    height:60,
    alignItems:'center',
    borderWidth:3,
    borderRadius:15,
    borderColor:Colors.PRIMARY,
    margin:5,
  },
  selectedCategoryContainer:{
backgroundColor:Colors.SECONDARY,
borderColor:Colors.SECONDARY,

  }


})
