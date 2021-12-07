import React, {useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Input, Text, Button} from '@ui-kitten/components';
import firestore from '@react-native-firebase/firestore';

const CreateRoom = ({navigation}) => {
  const [roomName, setRoomName] = useState('');

  const onSubmitRoom = () => {
    if (roomName.length > 0) {
      firestore()
        .collection('Threads')
        .add({
          name: roomName,
          latestMessage: {
            text: `Grup ${roomName} berhasil dibuat`,
            createdAt: new Date().getTime(),
          },
        })
        .then(docRef => {
          docRef.collection('Messages').add({
            text: `Grup ${roomName} berhasil dibuat`,
            createdAt: new Date().getTime(),
            system: true,
          });
          navigation.navigate('GrupGuru');
        });
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text>Silahkan buat grup baru</Text>
      <Input
        style={styles.input}
        placeholder="Masukkan nama grup baru"
        onChangeText={text => setRoomName(text)}
        value={roomName}
      />
      <Button
        style={styles.button}
        onPress={() => onSubmitRoom()}
        disabled={roomName.length === 0}>
        Buat
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  input: {
    marginTop: 20,
  },
  button: {
    width: '100%',
  },
});

export default CreateRoom;
