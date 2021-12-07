import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, LogBox} from 'react-native';
import {Divider, List, ListItem, Icon, Text} from '@ui-kitten/components';
import {
  GiftedChat,
  Send,
  Bubble,
  SystemMessage,
  MessageImage,
} from 'react-native-gifted-chat';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';

const RoomLesson = ({route}) => {
  const {threadLesson} = route.params;
  const [messages, setMessages] = useState([]);
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [photo, setPhoto] = useState(null);

  //hide warning
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications

  // Handle user state changes
  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  //photo
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 400,
      cropping: true,
      useFrontCamera: true,
    }).then(image => {
      setPhoto(image.path);
    });
  };

  async function handleSend(messages) {
    const text = messages[0].text;
    firestore()
      .collection('ThreadsLesson')
      .doc(threadLesson._id)
      .collection('Messages')
      .add({
        text,
        image: photo,
        createdAt: new Date().getTime(),
        user: {
          _id: user.uid,
          email: user.email,
        },
      })
      .then(() => {
        setPhoto(null);
      });
  }

  function renderSend(props) {
    return (
      <>
        <TouchableOpacity
          onPress={takePhotoFromCamera}
          style={styles.sendingContainer}>
          <Icon name="attach" fill="#1890FF" style={styles.icon} />
        </TouchableOpacity>
        <Send {...props}>
          <View style={styles.sendingContainer}>
            <Icon
              name="arrow-circle-right"
              fill="#1890FF"
              style={styles.icon}
            />
          </View>
        </Send>
      </>
    );
  }

  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#1890FF',
          },
          left: {
            backgroundColor: '#fff',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
          left: {
            color: 'black',
          },
        }}
      />
    );
  }

  function renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
        wrapperStyle={styles.systemMessageWrapper}
        textStyle={styles.systemMessageText}
      />
    );
  }

  function scrollToBottomComponent() {
    return (
      <View style={styles.bottomComponentContainer}>
        <Icon name="arrowhead-down" fill="#323330" style={styles.icon} />
      </View>
    );
  }

  const onSuscriber = () => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  };
  useEffect(() => {
    const messagesListener = firestore()
      .collection('ThreadsLesson')
      .doc(threadLesson._id)
      .collection('Messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const messages = querySnapshot.docs.map(doc => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: '',
            image: '',
            createdAt: new Date().getTime(),
            ...firebaseData,
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.email,
            };
          }

          return data;
        });

        setMessages(messages);
      });
    // Stop listening for updates whenever the component unmounts
    onSuscriber();
    return () => messagesListener();
  }, []);

  if (initializing) return null;
  return (
    <View style={styles.wrapper}>
      <GiftedChat
        messages={messages}
        isTyping={true}
        onSend={newMessage => handleSend(newMessage)}
        user={{_id: user.uid}}
        placeholder="Ketikan pesan anda ..."
        renderSend={renderSend}
        renderBubble={renderBubble}
        renderSystemMessage={renderSystemMessage}
        showUserAvatar
        alwaysShowSend
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
        renderUsernameOnMessage={true}
        // renderMessageImage={true}
      />
      {photo != null && (
        <Image
          source={{
            uri: photo,
          }}
          style={styles.image}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  sendingContainer: {
    marginBottom: 5,
    flexDirection: 'row',
  },
  icon: {
    width: 32,
    height: 32,
  },
  bottomComponentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  systemMessageWrapper: {
    backgroundColor: '#6646ee',
    borderRadius: 4,
    padding: 5,
  },
  systemMessageText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  image: {
    height: 250,
    marginBottom: 10,
  },
});

export default RoomLesson;
