import { View, FlatList, Image ,StyleSheet, Dimensions} from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import {db} from './../../config/FirebaseConfig'



export default function Slider() {
    
    const[sliderList,setSLiderList]=useState([]);
    useEffect(()=>{
      GetSliders();  
    },[])
    const GetSliders=async()=>{
        setSLiderList([]);
        const snapsShot=await getDocs(collection(db,'Sliders'));
        snapsShot.forEach((doc)=>{
            setSLiderList(sliderList=>[...sliderList,doc.data()]);
        })
    }
  return (
    <View style={{
        marginTop:15,

    }}>
      <FlatList 
      data={sliderList}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({item,index})=>(
        <View>
            <Image source={{uri:item?.imageUrl}} 
            style={styles?.silderImage}
            />
        </View>
      )
      }
      />
    </View>
  )
}

const styles = StyleSheet.create({
   silderImage:{
    width:Dimensions.get('screen').width*0.9,
    height:149,
    borderRadius:20,
    marginRight:10,
   }
})
