import React, { useState, useLayoutEffect } from 'react';
import {
    View,
    Text,
    Image,
    ActivityIndicator,
    TextInput,
    Button,
    TouchableOpacity,
    Alert,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

const API_KEY = process.env.EXPO_PUBLIC_GURUJI_LAB_API; 
const BASE_URL = 'https://aigurulab.tech';

export default function TextToImageGenerator() {
    const navigation = useNavigation();
    const [prompt, setPrompt] = useState("");
    const [imageData, setImageData] = useState(null);
    const [loading, setLoading] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({ title: 'Text to Image Generator' });
    }, [navigation]);

    const AiImageGenerate = async (input) => {
        return await axios.post(
            `${BASE_URL}/api/generate-image`,
            {
                width: 1024,
                height: 1024,
                input: input,
                model: 'sdxl',
                aspectRatio: "1:1"
            },
            {
                headers: {
                    'x-api-key': API_KEY,
                    'Content-Type': 'application/json',
                },
            }
        );
    };

    const generateImage = async () => {
        if (!prompt.trim()) {
            Alert.alert("Enter a prompt", "Please enter something to generate an image.");
            return;
        }

        setLoading(true);
        setImageData(null);

        try {
            const response = await AiImageGenerate(prompt);
            console.log("Image generation response:", response.data);

            const data = response.data;

            if (data.result === "Not Enough Credits") {
                Alert.alert("Out of Credits", "You don't have enough credits to generate an image. Please visit your dashboard at aiguurlab.tech.");
                return;
            }

            if (!data.image) {
                Alert.alert("Error", "Image generation failed. No image returned.");
                return;
            }

            // Here, directly set the URL from the API response
            const imageUrl = data.image; // Image is a direct URL
            setImageData(imageUrl);
        } catch (error) {
            console.error("Generation error:", error?.response?.data || error.message);
            Alert.alert("Error", "Image generation failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const saveImage = async () => {
        if (!imageData) return;
    
        try {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert("Permission required", "Please allow access to save images.");
                return;
            }
    
            // Create a filename for the image
            const fileName = `generated_${Date.now()}.png`;
            const fileUri = FileSystem.documentDirectory + fileName;
    
            // Download the image from the URL
            const downloadResumable = FileSystem.createDownloadResumable(
                imageData, // image URL
                fileUri
            );
    
            const { uri } = await downloadResumable.downloadAsync();
    
            // Save to gallery
            const asset = await MediaLibrary.createAssetAsync(uri);
            await MediaLibrary.createAlbumAsync('TextToImage', asset, false);
    
            Alert.alert("Saved", "Image has been saved to your gallery.");
        } catch (error) {
            console.error("Save error:", error);
            Alert.alert("Error", "Could not save the image.");
        }
    };
    

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 10, fontWeight: 'bold' }}>AI Image Generator</Text>

            <TextInput
                style={{
                    width: '100%',
                    padding: 12,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 8,
                    marginBottom: 15,
                    fontSize: 16,
                }}
                placeholder="e.g. A robot painting a sunset"
                value={prompt}
                onChangeText={setPrompt}
            />

            <Button title={loading ? "Generating..." : "Generate Image"} onPress={generateImage} disabled={loading} />

            {loading && <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 20 }} />}

            {imageData && !loading && (
                <>
                    <Image
                        source={{ uri: imageData }} // Directly use the URL returned from API
                        style={{
                            width: 300,
                            height: 300,
                            marginTop: 20,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: '#ccc',
                            backgroundColor: '#eee',
                        }}
                        resizeMode="contain"
                        onError={(e) => {
                            console.log('Image load error:', e.nativeEvent.error);
                            Alert.alert("Image Load Failed", "Unable to load the generated image.");
                        }}
                    />

                    <TouchableOpacity
                        onPress={saveImage}
                        style={{
                            marginTop: 15,
                            padding: 12,
                            backgroundColor: '#28a745',
                            borderRadius: 8,
                        }}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Save to Gallery</Text>
                    </TouchableOpacity>
                </>
            )}
        </ScrollView>
    );
}
