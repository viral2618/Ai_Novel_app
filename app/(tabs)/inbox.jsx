import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, where } from "firebase/firestore";
import { query } from "firebase/database";
import { db } from "./../../config/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import UserItem from "../../component/Inbox/UserItem";

export default function Inbox() {
  const { user } = useUser();
  const [userList, setUserList] = useState([]);
  const[loader,setLoader]=useState(false)
  useEffect(() => {
    user && GetUserList();
  }, [user]);
  //get the user list depends on user emails
  const GetUserList = async () => {
    setLoader(true)
    setUserList([])
    const q = query(
      collection(db, "Chat"),
      where("userIds", "array-contains", user?.primaryEmailAddress.emailAddress)
    );

    const querySnapShot = await getDocs(q);

    querySnapShot.forEach((doc) => {
      setUserList(prevList => [...prevList, doc.data()]);
      setLoader(false)
    });
  };

  //filter out the list of oyher users in one state
const MapOtherUserLIst=()=>{
  const list=[];
  userList.forEach((record)=>{
    const OtherUser=record.user?.filter(user=>user?.email!=user?.primaryEmailAddress?.emailAddress)
    const result={
      docId:record.id,
      ...OtherUser[0]
    }
    list.push(result)
  })

  return list;
}

  return (
    <View style={{
      padding:20,

    }}>
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:30
      }}>Inbox</Text>
      <FlatList
      data={MapOtherUserLIst()}
      refreshing={loader}
      onRefresh={GetUserList}
      style={{
        marginTop:20
      }}
      renderItem={({item,index})=>(
        <UserItem userInfo={item} key={index}/>

  )}
      />
    </View>
  );
}
