import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Divider, List, ListItem, Button, Text, Icon} from '@ui-kitten/components';
import firestore from '@react-native-firebase/firestore';
import Loading from '../../../../components/Loading';
import moment from 'moment';
import 'moment/locale/id';
import auth from '@react-native-firebase/auth';

const ChatSiswa = ({navigation}) => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  
  // Handle user state changes
  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  const StarIcon = (props) => (
    <Icon {...props} name='plus' />
  );
  
  
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Threads')
      .onSnapshot(querySnapshot => {
        const threads = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id,
            // give defaults
            name: '',
            latestMessage: {
              text: '',
              createdAt: '',
            },
            ...documentSnapshot.data(),
          };
        });

        setThreads(threads);

        if (loading) {
          setLoading(false);
        }
      });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [])

  if (loading) {
    return <Loading />;
  }

  console.log(moment(threads[0].latestMessage.createdAt).toDate())


  return (
    <>
      <View style={styles.wrapper}>
        <FlatList
          data={threads}
          renderItem={({item}) => (
            // <ListItem
            //   key={item.id}
            //   onPress={() => navigation.navigate('Room', {thread: item})}
            //   title={item.name}
            //   description={item.latestMessage.text}
            // />
            <TouchableOpacity style={styles.wrapperCard}  onPress={() => navigation.navigate('Room', {thread: item})}>
                <View style={styles.wrapper__image}>
                        <Image
                            source={{
                            uri: `https://randomuser.me/api/portraits/lego/${
                                Math.floor(Math.random() * 9) + 1
                            }.jpg`,
                            }}
                            style={styles.image}
                        />
                </View>
                <View>
                    <Text style={{fontWeight: 'bold'}}>{item.name}</Text>
                    {/* <Text>{moment(item.latestMessage.createdAt).toDate().locale('id').format('L')|| ''}</Text> */}
                    <Text>{item.latestMessage.text || ""}</Text>
                </View>
                <View style={styles.border}></View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item._id}
          style={{marginBottom: 20}}
        />
        {/* {
          user.email === "yukafit@gmail.com" && (
          //   <Button
          //     style={styles.floatingButton}
          //     onPress={() => navigation.navigate('FotoAbsensiSiswa')}>
          //   +
          // </Button>   
           <Button
              style={styles.floatingButton}
              appearance='filled'
              accessoryLeft={StarIcon}
              onPress={() => navigation.navigate('NewGrup')}
           />
          )
        } */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff'
  },
  wrapper__image: {
    marginLeft: 20
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 20
  },
  card: {
    marginBottom: 10
  },
  wrapperCard: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 25,
      marginTop: 8
  },
  border: {
    borderBottomColor: 'blue',
    borderBottomWidth: 2
  },
  floatingButton:{
    width: 60,  
    height: 60,   
    borderRadius: 30,                                    
    position: 'absolute',                                          
    bottom: 10,                                                    
    right: 10, 
  }

});

export default ChatSiswa;
