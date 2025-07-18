import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
import Colors from './../../constants/Colors';

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{
        tabBarActiveTintColor: Colors.RED, // Color for active tab
        tabBarInactiveTintColor: '#ffffff', // Color for inactive tabs
        tabBarStyle: {
          backgroundColor: '#000000', // Black background for the tab bar
          borderTopWidth: 0, // Optional: Remove border on top of the tab bar
        },
      }}
    >
      <Tabs.Screen 
        name='home' 
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home-circle" size={24} color={color} />
          ),
        }} 
      />
      
      <Tabs.Screen 
        name='favorite' 
        options={{
          title: 'Favorite',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="heart" size={24} color={color} />
          ),
        }} 
      />
      
      <Tabs.Screen 
        name='artificial' 
        options={{
          title: 'AI',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="brain" size={24} color={color} />
          ),
        }} 
      />
      
      <Tabs.Screen 
        name='inbox' 
        options={{
          title: 'Inbox',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="message-badge" size={24} color={color} />
          ),
        }} 
      />
      
      <Tabs.Screen 
        name='profile' 
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="people-circle" size={24} color={color} />
          ),
        }} 
      />
    </Tabs>
  );
}
