import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, Alert} from 'react-native';
import {Text, Button, Icon} from '@ui-kitten/components';
import ImagePicker from 'react-native-image-crop-picker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const FotoIcon = props => (
  <Icon {...props} style={styles.icon} fill="#8F9BB3" name="camera" />
);

const FotoAbsensi = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [photo, setPhoto] = useState(null);

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

  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  const getCurrentDate = `${date} - ${month} - ${year}`;

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

  const onSubmitAttendance = async () => {
    firestore()
      .collection('Attendance')
      .add({
        email: user.email,
        image: photo,
        attendanceTime: firestore.Timestamp.fromDate(new Date()),
        status: 'Hadir',
      })
      .then(() => {
        Alert.alert(
          'Absensi Sukses',
          'Selamat anda telah melakukan absensi kehadiran',
        );
        setPhoto(null);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      {photo === null ? (
        <View style={styles.fotoForm}>
          <Button
            appearance="ghost"
            accessoryLeft={FotoIcon}
            onPress={takePhotoFromCamera}
          />
          <Text>Pencet gambar foto</Text>
        </View>
      ) : (
        <Image
          source={{
            uri: photo,
          }}
          style={styles.image}
        />
      )}

      <Text>Tanggal: {getCurrentDate}</Text>
      <Button style={styles.submitBottom} onPress={() => onSubmitAttendance()}>
        Kirim Foto
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  fotoForm: {
    height: 300,
    width: 300,
    backgroundColor: 'white',
    borderBottomLeftRadius: 150,
    borderBottomEndRadius: 150,
    borderTopEndRadius: 150,
    borderTopLeftRadius: 150,
    marginBottom: 20,
    justifyContent: 'center',
    borderColor: 'red',
    alignItems: 'center',
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
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 250 / 2,
    marginBottom: 20,
  },
});

export default FotoAbsensi;
