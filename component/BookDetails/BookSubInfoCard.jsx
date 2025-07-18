import { View, Text, Image } from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';

export default function BookSubInfoCard({ icon, title, value }) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: Colors.WHITE,
        alignItems: 'center',
        padding: 10,
        margin: 5,
        borderRadius: 8,
        gap: 10,
        flex: 1,
      }}
    >
      <Image source={icon} style={{ width: 40, height: 40 }} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: 'outfit', fontSize: 16, color: Colors.GRAY }}>
          {title}
        </Text>
        <Text style={{ fontFamily: 'outfit-medium', fontSize: 15 }}>{value}</Text>
      </View>
    </View>
  );
}