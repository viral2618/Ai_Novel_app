import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuth, useUser } from "@clerk/clerk-expo";
import Colors from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function Profile() {
  const { user } = useUser();
  const{signOut}=useAuth();
  const router=useRouter();
  const onPressMenu=(menu)=>{
    if(menu=='logout'){
      signOut();
      return ;
    }
    router.push(menu.path)
  }

  const Menu = [
    {
      id: 1,
      name: "Add New Book",
      icon: "add-circle",
      path: "/add-new-book",
    },
    {
      id: 2,
      name: "Favorites",
      icon: "heart",
      path: "/(tabs)/favorite",
    },
    {
      id: 3,
      name: "My Post",
      icon: "bookmark",
      path: "/../user-post",
    },
    {
      id: 4,
      name: "Inbox",
      icon: "chatbubble",
      path: "/(tabs)/inbox",
    },
    {
      id: 5,
      name: "Logout",
      icon: "exit",
      path: "/login",
    },
  ];

  return (
    <View style={{  padding: 20, 
      backgroundColor:Colors.BLACK,
      flex:1,

    }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 30 ,color:Colors.WHITE}}>Profile</Text>
      <View
        style={{ display: "flex", alignItems: "center", marginVertical: 25 }}
      >
        <Image
          source={{ uri: user?.imageUrl }}
          style={{
            width: 80,
            height: 80,
            borderRadius: 99,
            borderWidth:3.5,
            borderColor:Colors.WHITE,
          }}
        />
        <Text style={{ fontFamily: "outfit-bold", fontSize: 20, marginTop: 9 ,color:Colors.WHITE}}>
          {user?.fullName}
        </Text>
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 16,
            color: Colors.WHITE,
          }}
        >
          {user?.primaryEmailAddress?.emailAddress}
        </Text>
      </View>

      <FlatList
        data={Menu}
        renderItem={({ item }) => (
          <TouchableOpacity
          onPress={()=>onPressMenu(item)}
          key={item.id}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 4,
              gap:10,
              backgroundColor:Colors.GRAY,
              padding:8,
              borderRadius:15,
              marginTop:9
            }}
          >
            <Ionicons
              name={item.icon}
              size={23}
              color={Colors.PRIMARY}
              style={{
                padding: 20,
                backgroundColor: Colors.RED,
                borderRadius:5,
              }}
            />
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 20,
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
