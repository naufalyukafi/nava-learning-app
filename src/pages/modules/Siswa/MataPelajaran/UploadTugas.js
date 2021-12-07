import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native';
import {Text, Button, Icon} from '@ui-kitten/components';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const UploadTugas = (threadLesson) => {
  const [photos, setPhotos] = useState(null);
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

  const takePhotoFromGalery = () => {
    ImagePicker.openPicker({
      multiple: true
    }).then(images => {
      setPhotos(images.map(item => item.path));
    });
  }
  const onSubmitAssigment = async () => {
    firestore()
      .collection('Assigment' + threadLesson.threadLesson.mapel)
      .add({
        email: user.email,
        images: photos,
        assigmentTime: firestore.Timestamp.fromDate(new Date()),
      })  
      .then(() => {
        alert('Selamat anda telah melakukan upload tugas');
        setPhotos(null);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      {photos === null ? 
      <TouchableOpacity style={styles.fotoForm} onPress={takePhotoFromGalery}>
        <Icon style={styles.icon} fill="#1D6EDC" name="cloud-upload" />
        <Text>Masukkan File Anda</Text>
      </TouchableOpacity> : (
        <>
        <Image
          source={{uri: photos[0]}}
          style={styles.image}
        />
        <View style={{width: '100%', justifyContent: 'center', flexDirection: 'row'}}>
        {photos.length > 3 && ( alert('foto tidak boleh melebihi dari 3 gambar') + setPhotos(null) )}
        {photos.map(item => (
          <View>
            <Image
              source={{uri: item}}
              style={styles.images}
            />
          </View>
        ))} 
        </View> 
        </>
      )
      
      }
      <Button style={styles.submitBottom} onPress={onSubmitAssigment}>Kumpulkan</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  fotoForm: {
    height: 300,
    width: 300,
    backgroundColor: 'white',
    borderRadius: 150,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  submitBottom: {
    width: '100%',
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
  image: {
    width: 250,
    height: 250,
    marginTop: 20,
  },
  images: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginTop: 20,
    marginBottom: 20
  },
  tab: {
    height: 192,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default UploadTugas;