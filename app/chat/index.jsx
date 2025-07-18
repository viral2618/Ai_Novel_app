import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text, Platform, Alert } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { addDoc, collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat';
import moment from 'moment';
import { IconButton } from 'react-native-paper';
import * as Notifications from 'expo-notifications';

// Configure notification handler to show notifications when app is foregrounded
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function ChatScreen() {
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const { user } = useUser();
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState(null);
  const notificationListener = useRef();
  const responseListener = useRef();

  // Register for push notifications and get token
  useEffect(() => {
    let notificationSub, responseSub;

    registerForPushNotificationsAsync().then(token => {
      setExpoPushToken(token);
    });

    // Save the subscription objects so we can remove them later
    notificationSub = Notifications.addNotificationReceivedListener(notification => {
      // Handle foreground notification
    });

    responseSub = Notifications.addNotificationResponseReceivedListener(response => {
      // Handle response
    });

    // Store in refs for potential future usage (optional)
    notificationListener.current = notificationSub;
    responseListener.current = responseSub;

    // CLEANUP: Use .remove() instead of deprecated removeNotificationSubscription
    return () => {
      notificationSub && notificationSub.remove();
      responseSub && responseSub.remove();
    };
  }, []);

  useEffect(() => {
    GetUserDetails();

    const unSubscribe = onSnapshot(collection(db, 'Chat', params?.id, 'Messages'), (snapshot) => {
      const messageData = snapshot.docs
        .map((doc) => ({
          _id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt ? new Date(doc.data().createdAt) : new Date(),
        }))
        .sort((a, b) => b.createdAt - a.createdAt);

      setMessages(messageData);
    });

    return () => unSubscribe();
  }, []);

  const GetUserDetails = async () => {
    try {
      const docRef = doc(db, 'Chat', params?.id);
      const docSnap = await getDoc(docRef);
      const result = docSnap.data();
      const otherUser = result?.user.filter(item => item.email !== user?.primaryEmailAddress?.emailAddress);

      if (otherUser.length > 0) {
        navigation.setOptions({
          headerTitle: otherUser[0].name,
        });
      }
    } catch (error) {
      console.error('Error fetching chat user details:', error);
    }
  };

  async function sendPushNotification(expoPushToken, message) {
    if (!expoPushToken) return;

    const messageBody = {
      to: expoPushToken,
      sound: 'default',
      title: 'New message',
      body: message.text || 'You have a new message',
      data: { message },
    };

    try {
      await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageBody),
      });
    } catch (error) {
      console.error('Error sending push notification:', error);
    }
  }

  const onSend = async (newMessages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));

    const messageToSave = {
      ...newMessages[0],
      createdAt: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, 'Chat', params.id, 'Messages'), messageToSave);

      const chatDoc = await getDoc(doc(db, 'Chat', params.id));
      const chatData = chatDoc.data();
      const otherUser = chatData?.user.find(u => u.email !== user?.primaryEmailAddress?.emailAddress);

      if (otherUser?.expoPushToken) {
        await sendPushNotification(otherUser.expoPushToken, messageToSave);
      }
    } catch (error) {
      console.error('Error sending message or notification:', error);
      Alert.alert('Error', 'Failed to send message.');
    }
  };

  const handleTyping = () => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1000);
  };

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: '#f0f0f0',
          borderRadius: 20,
          padding: 10,
          marginBottom: 5,
          maxWidth: '80%',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 1,
          elevation: 2,
        },
        right: {
          backgroundColor: '#007AFF',
          borderRadius: 20,
          padding: 10,
          marginBottom: 5,
          maxWidth: '80%',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 1,
          elevation: 2,
        },
      }}
      textStyle={{
        left: {
          color: '#000',
          fontSize: 16,
        },
        right: {
          color: '#fff',
          fontSize: 16,
        },
      }}
      timeTextStyle={{
        left: { color: '#888', fontSize: 12 },
        right: { color: '#ccc', fontSize: 12 },
      }}
      renderTime={(timeProps) => (
        <Text style={{ fontSize: 10, color: '#999', marginTop: 2 }}>
          {moment(timeProps.currentMessage.createdAt).format('h:mm A')}
        </Text>
      )}
    />
  );

  const renderSend = (props) => (
    <Send {...props}>
      <View style={styles.sendingContainer}>
        <IconButton icon="send-circle" size={32} color="#007AFF" />
      </View>
    </Send>
  );

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      onInputTextChanged={handleTyping}
      renderBubble={renderBubble}
      renderSend={renderSend}
      placeholder="Type your message..."
      showUserAvatar={true}
      user={{
        _id: user?.primaryEmailAddress?.emailAddress,
        name: user?.fullName,
        avatar: user?.imageUrl,
      }}
      isTyping={isTyping}
      alwaysShowSend
      scrollToBottom
      scrollToBottomComponent={() => (
        <View style={styles.scrollToBottom}>
          <IconButton icon="chevron-down" size={24} color="#007AFF" />
        </View>
      )}
    />
  );
}

// Register for push notifications
async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (finalStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    Alert.alert('Permission required', 'Failed to get push token for push notification!');
    return null;
  }

  token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
}

const styles = StyleSheet.create({
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  scrollToBottom: {
    padding: 10,
  },
});
