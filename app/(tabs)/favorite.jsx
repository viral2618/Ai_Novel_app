import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Shared from "../../Shared/Shared";
import { useUser } from "@clerk/clerk-expo";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/FirebaseConfig";
import BookListItem from "../../component/Home/BookListItem";

export default function Favorite() {
  const { user } = useUser();
  const [favIds, setFavIds] = useState([]);
  const [favBookList, setFavBookList] = useState([]);
  const [loader,setLoader]=useState(false);

  useEffect(() => {
    user && GetFavBookIds();
  }, [user]);

  //fav ids
  const GetFavBookIds = async () => {
    setLoader(true);
    const result = await Shared.GetFavList(user);
    setFavIds(result.favorites);
    setLoader(false);
    GetFavBookList(result.favorites);
  };

  //fetch related book list
  const GetFavBookList = async (favId_) => {
    setLoader(true);
    setFavBookList([])
    const q = query(collection(db, "Books"), where("id", "in", favId_));
    const querySnapShot = await getDocs(q);

    querySnapShot.forEach((doc) => {
      console.log(doc.data());
      setFavBookList((prev) => [...prev, doc.data()]);
    });
    setLoader(false);
  };

  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: 30,
        }}
      >
        Favorites
      </Text>
      <FlatList
        data={favBookList}
        numColumns={2}
        onRefresh={GetFavBookIds}
        refreshing={loader}
        renderItem={({ item, index }) => (
          <View>
            <BookListItem book={item} />
          </View>
        )}
      />
    </View>
  );
}
