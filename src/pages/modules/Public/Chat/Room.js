import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import {Divider, List, ListItem, Icon, Text} from '@ui-kitten/components';
import {
  GiftedChat,
  Send,
  Bubble,
  SystemMessage,
} from 'react-native-gifted-chat';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Chat = ({route}) => {
  const {thread} = route.params;
  const [messages, setMessages] = useState([]);
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  // helper method that is sends a message
  // function handleSend(newMessage = []) {
  //   setMessages(GiftedChat.append(messages, newMessage));
  // }

  async function handleSend(messages) {
    const text = messages[0].text;
    firestore()
      .collection('Threads')
      .doc(thread._id)
      .collection('Messages')
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: user.uid,
          email: user.email,
        },
      });

    await firestore()
      .collection('Threads')
      .doc(thread._id)
      .set(
        {
          latestMessage: {
            text,
            createdAt: new Date().getTime(),
          },
        },
        {merge: true},
      );
  }

  function renderSend(props) {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <Icon name="arrow-circle-right" fill="#1890FF" style={styles.icon} />
        </View>
      </Send>
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
      .collection('Threads')
      .doc(thread._id)
      .collection('Messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const messages = querySnapshot.docs.map(doc => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: '',
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
  console.log(user);

  if (initializing) return null;

  return (
    <View style={styles.wrapper}>
      <GiftedChat
        messages={messages}
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
        
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  sendingContainer: {
    marginBottom: 5,
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
});

export default Chat;
