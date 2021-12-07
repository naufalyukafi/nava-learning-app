import React, {useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Input, Text, Button} from '@ui-kitten/components';
import firestore from '@react-native-firebase/firestore';

const NewLesson = ({navigation}) => {
  const [lesson, setLesson] = useState('');
  const [teacher, setTeacher] = useState('');

  const onSubmitRoom = () => {
    if ((lesson.length && teacher.length) > 0) {
      firestore()
        .collection('ThreadsLesson')
        .add({
          mapel: lesson,
          name: teacher,
        })
        .then(docRef => {
          docRef.collection('Messages').add({
            text: `Selamat datang di grup diskusi materi Mata Pelajaran ${lesson}`,
            createdAt: new Date().getTime(),
            system: true,
          });
          navigation.navigate('LessonGuru');
        });
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={{marginBottom: 20}}>Silahkan buat mata pelajaran baru</Text>
      <Input
        style={styles.input}
        placeholder="Masukkan mata pelajaran Anda"
        onChangeText={text => setLesson(text)}
        value={lesson}
      />
      <Input
        style={styles.input}
        placeholder="Masukkan nama Anda"
        onChangeText={text => setTeacher(text)}
        value={teacher}
      />
      <Button
        style={styles.button}
        onPress={() => onSubmitRoom()}
        disabled={(lesson.length && teacher.length) === 0}>
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
    marginBottom: 20,
  },
  button: {
    width: '100%',
  },
});

export default NewLesson;
