import { View, Text } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import MarkFav from './MarkFav'

export default function BookInfo({ book }) {
  return (
    <View style={{ paddingHorizontal: 20, paddingTop: 90 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text
          style={{
            fontFamily: 'outfit-bold',
            fontSize: 27,
            color: Colors.BLACK,
            flex: 1,
            flexWrap: 'wrap',
          }}
        >
          {book?.name}
        </Text>
        <MarkFav book={book} />
      </View>

      <Text
        style={{
          fontFamily: 'outfit-medium',
          fontSize: 16,
          color: Colors.GRAY,
          marginTop: 4,
        }}
      >
        {book?.author}
      </Text>
    </View>
  )
}
