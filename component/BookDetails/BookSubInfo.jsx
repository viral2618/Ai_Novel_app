import { View, Text, Image } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import BookSubInfoCard from './BookSubInfoCard'

export default function BookSubInfo({book}) {
  return (
    <View style={{
      paddingHorizontal:20,

    }}>
      <View style={{
        display:'flex',
        flexDirection:'row',
      }}>
        <BookSubInfoCard 
        icon={require('./../../assets/images/calendar.png')}
        title={'Age'}
        value={book?.age}
        />
        <BookSubInfoCard 
        title={'Breed'}
        icon={require('./../../assets/images/bone.png')}
        value={book?.age}
        />
      </View>
      <View style={{
        display:'flex',
        flexDirection:'row',
      }}>
        <BookSubInfoCard 
        icon={require('./../../assets/images/sex.png')}
        title={'Age'}
        value={book?.age}
        />
        <BookSubInfoCard 
        title={'Breed'}
        icon={require('./../../assets/images/weight.png')}
        value={book?.age}
        />
      </View>
    </View>
  )
}