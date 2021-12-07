import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {Divider, List, ListItem, Text, Button} from '@ui-kitten/components';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Loading from '../../../../components/Loading';

const Lesson = ({navigation}) => {
  const [threadsLesson, setThreadsLesson] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(true);

  // Handle user state changes
  const onAuthStateChanged = currentUser => {
    setCurrentUser(currentUser);
    if (initializing) setInitializing(false);
  };

  const onSuscriber = () => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  };

  useEffect(async () => {
    const unsubscribe = firestore()
      .collection('ThreadsLesson')
      .onSnapshot(querySnapshot => {
        const threadsLesson = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            // give defaults
            mapel: '',
            name: '',
            ...documentSnapshot.data(),
          };
        });

        setThreadsLesson(threadsLesson);
        firestore()
          .collection('Users')
          .onSnapshot(querySnapshot => {
            const getUsers = querySnapshot.docs.map(documentSnapshot => {
              return {
                _id: documentSnapshot.id,
                // give defaults
                email: '',
                ...documentSnapshot.data(),
              };
            });

            setUsers(getUsers);

            if (loading) {
              setLoading(false);
            }
          });

        if (loading) {
          setLoading(false);
        }
      });

    onSuscriber();
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <View style={styles.wrapper__box}>
          {threadsLesson.map(item => (
            <TouchableOpacity
              style={styles.box}
              key={item._id}
              onPress={() => {
                if (currentUser.email === 'molidulearning@gmail.com') {
                  navigation.navigate('RoomLesson', {threadLesson: item});
                } else {
                  navigation.navigate('RoomStudent', {threadLesson: item});
                }
              }}>
              <Text style={styles.title__lesson} category="h1">
                {item.mapel}
              </Text>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.title__h1} category="h1">
          Daftar Siswa
        </Text>

        <View style={styles.wrapper__student}>
          {users.map(item => (
            <View style={styles.box__student} key={item._id}>
              <Image
                source={{
                  uri: `https://randomuser.me/api/portraits/lego/${
                    Math.floor(Math.random() * 9) + 1
                  }.jpg`,
                }}
                style={styles.image}
              />
              <Text style={styles.title__h2} category="h2">
                {item.email}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  wrapper__box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  box: {
    backgroundColor: '#fff',
    padding: 20,
    width: '46%',
    borderRadius: 5,
    marginTop: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#CFCDCD',
  },
  title__lesson: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  title__h1: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  title__h2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    paddingTop: 8,
    flexWrap: 'wrap',
  },
  box__student: {
    backgroundColor: '#fff',
    paddingLeft: 20,
    borderRadius: 5,
    flexDirection: 'row',
    marginTop: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    marginBottom: 20,
    marginRight: 15,
    backgroundColor: 'green',
    marginTop: 10,
  },
});

export default Lesson;
