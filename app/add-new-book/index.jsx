import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import Colors from "../../constants/Colors";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db, storage } from "../../config/FirebaseConfig";
import { Picker } from "@react-native-picker/picker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";

export default function AddNewBook() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    category: "Book 1",
    name: '',
    author: '',
    age: '',
    about: '',
  });
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [image, setImage] = useState();
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Books",
    });
    GetCategories();
  }, []);

  const GetCategories = async () => {
    const snapshot = await getDocs(collection(db, "Category"));
    const categories = snapshot.docs.map(doc => doc.data());
    setCategoryList(categories);
  };

  const imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleInputChange = (fieldName, fieldValue) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  const onSubmit = () => {
    const requiredFields = ["name", "author", "category", "age", "about","Reading"];
    const isFormValid = requiredFields.every(field => formData[field]);

    if (!isFormValid || !image) {
      ToastAndroid.show("Please fill all fields and select an image", ToastAndroid.SHORT);
      return;
    }
    UploadImage();
  };

  const UploadImage = async () => {
    setLoader(true);
    try {
      const resp = await fetch(image);
      const blobImage = await resp.blob();
      const storageRef = ref(storage, "/FrictionForge/" + Date.now() + ".jpg");

      await uploadBytes(storageRef, blobImage);
      const downloadUrl = await getDownloadURL(storageRef);
      await saveFormData(downloadUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
      ToastAndroid.show("Error uploading image", ToastAndroid.SHORT);
    } finally {
      setLoader(false);
    }
  };

  const saveFormData = async (imageUrl) => {
    const docId = Date.now().toString();
    await setDoc(doc(db, "Books", docId), {
      ...formData,
      imageUrl: imageUrl,
      username: user?.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
      userImage: user?.imageUrl,
      id: docId,
    });
    router.replace('/(tabs)/home');
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>
        Add New Book For Users
      </Text>
      <Pressable onPress={imagePicker}>
        {!image ? (
          <Image
            source={require("./../../assets/images/login.png")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 15,
              borderWidth: 1,
              borderColor: Colors.GRAY,
            }}
          />
        ) : (
          <Image
            source={{ uri: image }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 15,
            }}
          />
        )}
      </Pressable>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Book Name *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputChange("name", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Author Name *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputChange("author", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Book Types *</Text>
        <Picker
          selectedValue={selectedCategory}
          style={styles.input}
          onValueChange={(itemValue) => {
            setSelectedCategory(itemValue);
            handleInputChange("category", itemValue);
          }}
        >
          {categoryList.map((category, index) => (
            <Picker.Item key={index} label={category.name} value={category.name} />
          ))}
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Book Age Limitation *</Text>
        <TextInput
          keyboardType="number-pad"
          style={styles.input}
          onChangeText={(value) => handleInputChange("age", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>About Book *</Text>
        <TextInput
          style={styles.input}
          numberOfLines={6}
          multiline={true}
          onChangeText={(value) => handleInputChange("about", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Novels Scenerio *</Text>
        <TextInput
          style={styles.input}
          numberOfLines={6}
          multiline={true}
          onChangeText={(value) => handleInputChange("Reading", value)}
        />
      </View>

      <TouchableOpacity style={styles.button} disabled={loader} onPress={onSubmit}>
        {loader ? <ActivityIndicator size={'large'} /> : 
        <Text style={{ fontFamily: "outfit-medium", textAlign: "center" }}>
          Submit
        </Text>}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 5,
  },
  input: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 7,
    fontFamily: "outfit",
  },
  label: {
    marginVertical: 5,
    fontFamily: "outfit",
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 7,
    marginVertical: 40,
  },
})