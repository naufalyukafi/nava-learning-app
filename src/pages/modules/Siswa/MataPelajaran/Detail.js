import React, {useState, useEffect} from 'react';
import {
  View,
  Alert,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Text, Button} from '@ui-kitten/components';
import auth from '@react-native-firebase/auth';
import {CardMapelScreen} from '../../../../components';
const DetailMataPelajaran = ({navigation}) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  const onDetailMapel = () => {
    if (user.email === 'molidulearning@gmail.com') {
      navigation.navigate('TugasGuru');
    } else {
      navigation.navigate('UploadTugas');
    }
  };
  return (
    <View style={styles.wrapper}>
      <Text>Mapel: Matematika</Text>
      <TouchableOpacity onPress={() => navigation.navigate('ChatGuru')}>
        <CardMapelScreen lessonName="Materi" bgLesson="#1890FF" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDetailMapel()}>
        <CardMapelScreen lessonName="Pengumpulan Tugas" bgLesson="#CCE918" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
  },
});

export default DetailMataPelajaran;
