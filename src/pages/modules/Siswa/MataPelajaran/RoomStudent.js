import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Text,
  Button,
  Icon,
  Tab,
  TabView,
  Layout,
  Card,
  List,
} from '@ui-kitten/components';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import UploadTugas from './UploadTugas'

const RoomStudent = ({route}) => {
  const {threadLesson} = route.params;
  const [messages, setMessages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const shouldLoadComponent = index => index === selectedIndex;

  useEffect(() => {
    const messagesListener = firestore()
      .collection('ThreadsLesson')
      .doc(threadLesson._id)
      .collection('Messages')
      .orderBy('createdAt', 'asc')
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
    return () => messagesListener();
  }, []);


  return (
    <TabView
      selectedIndex={selectedIndex}
      shouldLoadComponent={shouldLoadComponent}
      onSelect={index => setSelectedIndex(index)}
      tabBarStyle={{height: 50, top: 0}}
      style={styles.wrapper}>
      <Tab title="MATERI">
        <Layout style={styles.tabContainer}>
          <ScrollView>
            {messages.map(item => (
              <Card
                style={styles.item}
                status="basic"
                footer={footerProps => (
                  <Text {...footerProps}>
                    {moment(item.createdAt).format('LT')}
                  </Text>
                )}
                key={item._id}>
                {item.image != null && (
                  <Image
                    source={{
                      uri: item.image,
                    }}
                    style={styles.image}
                  />
                )}
                <Text>{item.text}</Text>
              </Card>
            ))}
          </ScrollView>
        </Layout>
      </Tab>
      <Tab title="KUMPULKAN">
          <UploadTugas threadLesson={threadLesson} />
          {/* <TouchableOpacity style={styles.fotoForm}>
            <Icon style={styles.icon} fill="#1D6EDC" name="cloud-upload" />
            <Text>Masukkan File Tugas Anda</Text>
          </TouchableOpacity>
          <Button style={styles.submitBottom}>Kumpulkan</Button> */}
      </Tab>
    </TabView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  fotoForm: {
    height: 300,
    width: 300,
    backgroundColor: 'white',
    borderRadius: 150,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBottom: {
    width: '90%',
    marginTop: 20,
  },
  icon: {
    width: 80,
    height: 80,
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  tabContainer: {
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#F6F5F5',
  },
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  item: {
    marginVertical: 4,
    marginBottom: 20,
    width: '100%',
  },
  image: {
    height: 250,
    marginBottom: 10,
  },
});

export default RoomStudent;
