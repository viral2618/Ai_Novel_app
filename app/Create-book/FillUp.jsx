import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { app } from './../../config/FirebaseConfig'; 

const FormScreen = () => {
  const navigation = useNavigation();
  const storage = getStorage(app);
  const db = getFirestore(app);

  const [novelName, setNovelName] = useState('');
  const [novelCategory, setNovelCategory] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Ai Generator',
      headerTransparent: true,
    });
  }, [navigation]);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission Denied', 'Permission to access media library is required.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImageToFirebase = async () => {
    if (!image) return null;

    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const imageRef = ref(storage, `FrictionForge/${Date.now()}.png`);

      await uploadBytes(imageRef, blob);
      return await getDownloadURL(imageRef);
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload image. Please try again.');
      return null;
    }
  };

  const handleSubmit = async () => {
    if (!novelName || !novelCategory) {
      Alert.alert('Missing Information', 'Please fill in both fields.');
      return;
    }

    try {
      const docRef = doc(db, 'AiGenerated', Date.now().toString());
      const docId = docRef.id;

      const imageUrl = await uploadImageToFirebase();

      const novelData = {
        novelName,
        novelCategory,
        coverImage: imageUrl || null,
      };

      await setDoc(docRef, novelData);

      navigation.navigate('Create-book/GenerateBook', {
        docId,
        novelName,
        novelCategory,
      });
    } catch (error) {
      console.error('Error saving data:', error);
      Alert.alert('Error', 'Failed to save data. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Novel Name"
        value={novelName}
        onChangeText={setNovelName}
      />
      <TextInput
        style={styles.input}
        placeholder="Novel Category"
        value={novelCategory}
        onChangeText={setNovelCategory}
      />

      {image && <Image source={{ uri: image }} style={styles.image} />}

      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick an Image</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Generate</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 12,
  },
  imageButton: {
    backgroundColor: '#28a745',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default FormScreen;
