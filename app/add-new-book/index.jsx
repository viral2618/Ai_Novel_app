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
import { Provider as PaperProvider } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import "intl";
import "intl/locale-data/jsonp/en";

export default function AddNewBook() {
  const navigation = useNavigation();
  const router = useRouter();
  const { user } = useUser();

  const [formData, setFormData] = useState({
    category: "Book 1",
    name: "",
    author: "",
    age: "",
    about: "",
    language: "",
    chapters: [""],
    publishDate: null,
  });

  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [image, setImage] = useState();
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    navigation.setOptions({ headerTitle: "Add New Book" });
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const snapshot = await getDocs(collection(db, "Category"));
      const categories = snapshot.docs.map((doc) => doc.data());
      setCategoryList(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleImagePicker = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const handleInputChange = (fieldName, value, index = null) => {
    if (fieldName === "chapter") {
      const updatedChapters = [...formData.chapters];
      updatedChapters[index] = value;
      setFormData((prev) => ({ ...prev, chapters: updatedChapters }));
    } else {
      setFormData((prev) => ({ ...prev, [fieldName]: value }));
    }
  };

  const addChapterField = () => {
    setFormData((prev) => ({ ...prev, chapters: [...prev.chapters, ""] }));
  };

  const removeChapterField = (index) => {
    const updatedChapters = [...formData.chapters];
    updatedChapters.splice(index, 1);
    setFormData((prev) => ({ ...prev, chapters: updatedChapters }));
  };

  const handleSubmit = async () => {
    const { name, author, age, about, language, chapters, publishDate } = formData;

    if (
      !name ||
      !author ||
      !age ||
      !about ||
      !language ||
      !image ||
      !publishDate ||
      chapters.some((c) => !c.trim())
    ) {
      ToastAndroid.show("Please fill all fields, pick a date, and select an image", ToastAndroid.SHORT);
      return;
    }

    try {
      setLoader(true);
      const imageUrl = await uploadImage();
      await saveBookData(imageUrl);
      router.replace("/(tabs)/home");
    } catch (error) {
      console.error("Error submitting form:", error);
      ToastAndroid.show("Error submitting the book", ToastAndroid.SHORT);
    } finally {
      setLoader(false);
    }
  };

  const uploadImage = async () => {
    const response = await fetch(image);
    const blobImage = await response.blob();
    const storageRef = ref(storage, `FrictionForge/${Date.now()}.png`);
    await uploadBytes(storageRef, blobImage);
    return await getDownloadURL(storageRef);
  };

  const saveBookData = async (imageUrl) => {
    const docId = Date.now().toString();

    const chapters = {};
    formData.chapters.forEach((chapterText, index) => {
      chapters[`Chapter${index + 1}`] = chapterText;
    });

    await setDoc(doc(db, "Books", docId), {
      id: docId,
      name: formData.name,
      author: formData.author,
      age: formData.age,
      about: formData.about,
      language: formData.language,
      category: formData.category,
      publishDate: formData.publishDate,
      imageUrl: imageUrl,
      username: user?.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
      userImage: user?.imageUrl,
      createdAt: new Date().toISOString(),
      ...chapters,
    });
  };

  return (
    <PaperProvider>
      <ScrollView style={{ padding: 20, backgroundColor: "#FAFAFA" }}>
        <Text style={{ fontFamily: "outfit-medium", fontSize: 24, marginBottom: 20, textAlign: "center" }}>
          Add New Book
        </Text>

        <Pressable onPress={handleImagePicker} style={{ alignItems: "center", marginBottom: 20 }}>
          {!image ? (
            <Image source={require("./../../assets/images/login.png")} style={styles.imagePlaceholder} />
          ) : (
            <Image source={{ uri: image }} style={styles.image} />
          )}
          <Text style={{ color: Colors.RED, marginTop: 8, fontSize: 14 }}>Pick Cover Image</Text>
        </Pressable>

        {[
          { label: "Book Name", key: "name" },
          { label: "Author Name", key: "author" },
          { label: "Age Group", key: "age" },
          { label: "About", key: "about", multiline: true },
        ].map((field, index) => (
          <View key={index} style={styles.inputContainer}>
            <Text style={styles.label}>{field.label} *</Text>
            <TextInput
              style={[styles.input, field.multiline && styles.textArea]}
              multiline={field.multiline}
              numberOfLines={field.multiline ? 5 : 1}
              onChangeText={(value) => handleInputChange(field.key, value)}
            />
          </View>
        ))}

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Language *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter language (e.g., English)"
            onChangeText={(value) => handleInputChange("language", value)}
            value={formData.language}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Book Types *</Text>
          <Picker
            selectedValue={selectedCategory}
            style={styles.input}
            onValueChange={(value) => {
              setSelectedCategory(value);
              handleInputChange("category", value);
            }}
          >
            <Picker.Item label="Select a category" value="" />
            {categoryList.map((category, index) => (
              <Picker.Item key={index} label={category.name} value={category.name} />
            ))}
          </Picker>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Publish Date *</Text>
          <Pressable onPress={() => setOpen(true)} style={styles.input}>
            <Text style={{ fontFamily: "outfit" }}>
              {selectedDate ? selectedDate.toDateString() : "Pick a date"}
            </Text>
          </Pressable>

          <DatePickerModal
            locale="en"
            mode="single"
            visible={open}
            onDismiss={() => setOpen(false)}
            date={selectedDate}
            onConfirm={(params) => {
              setOpen(false);
              setSelectedDate(params.date);
              setFormData((prev) => ({
                ...prev,
                publishDate: params.date.toISOString(),
              }));
            }}
          />
        </View>

        <Text style={[styles.label, { marginTop: 20, fontSize: 18 }]}>Chapters *</Text>
        {formData.chapters.map((chapter, index) => (
          <View key={index} style={styles.chapterContainer}>
            <Text style={[styles.label, { fontSize: 16 }]}>Chapter {index + 1}</Text>
            <TextInput
              style={styles.chapterInput}
              multiline
              placeholder={`Write Chapter ${index + 1} content here...`}
              numberOfLines={10}
              textAlignVertical="top"
              value={chapter}
              onChangeText={(value) => handleInputChange("chapter", value, index)}
            />
            {formData.chapters.length > 1 && (
              <Pressable onPress={() => removeChapterField(index)}>
                <Text style={styles.removeChapter}>Remove Chapter</Text>
              </Pressable>
            )}
          </View>
        ))}

        <Pressable onPress={addChapterField} style={styles.addChapterBtn}>
          <Text style={styles.addChapterText}>+ Add Another Chapter</Text>
        </Pressable>

        <TouchableOpacity style={styles.button} disabled={loader} onPress={handleSubmit}>
          {loader ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Submit Book</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10,
  },
  input: {
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    fontFamily: "outfit",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  label: {
    marginBottom: 5,
    fontFamily: "outfit-medium",
    color: "#333",
  },
  button: {
    padding: 16,
    backgroundColor: Colors.RED,
    borderRadius: 10,
    marginVertical: 30,
  },
  buttonText: {
    fontFamily: "outfit-medium",
    textAlign: "center",
    fontSize: 16,
    color: "#fff",
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.GRAY,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  chapterContainer: {
    marginVertical: 15,
    backgroundColor: "#f3f4f6",
    padding: 15,
    borderRadius: 10,
  },
  chapterInput: {
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    fontFamily: "outfit",
    fontSize: 14,
    marginTop: 8,
  },
  removeChapter: {
    color: Colors.RED,
    fontSize: 13,
    marginTop: 8,
  },
  addChapterBtn: {
    marginVertical: 10,
  },
  addChapterText: {
    color: Colors.RED,
    fontSize: 15,
    textAlign: "left",
  },
});
