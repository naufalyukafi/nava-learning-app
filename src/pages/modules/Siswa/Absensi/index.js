import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, Alert} from 'react-native';
import {Text, Button} from '@ui-kitten/components';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

const AbsensiSiswa = ({navigation}) => {
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);
  
    // Handle user state changes
    const onAuthStateChanged = user => {
      setUser(user);
      if (initializing) setInitializing(false);
    };

    useEffect(() => {
      const fetchAttendance = async () => {
        try {
          const list = [];
          await firestore()
            .collection('Attendance')
            .orderBy('attendanceTime', 'desc')
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                const {email, attendanceTime} = doc.data();
                list.push({
                  id: doc.id,
                  email,
                  attendanceTime,
                });
                // console.log(email)
              });

            });
          setAttendance(list);
          if (loading) {
            setLoading(false);
          }
        } catch (err) {
          console.error(err);
        }
      };
      fetchAttendance();
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
    }, []);
  
    if (initializing) return null;

    //jika use dan absensi.length === 1
    // console.log(attendance[3])
  
    console.log(attendance) 
    
  return (
    <View style={styles.container}>
      {/* <Text
        style={{
          color: '#E5E1E1',
          fontWeight: 'bold',
          paddingTop: 50,
          fontSize: 25,
          marginBottom: 10,
        }}>
        Molidu Education
      </Text> */}
      <Image
        source={require('../../../../assets/images/presensi.png')}
        style={styles.image}
      />
      <View style={styles.bottom}>
        {
          attendance.forEach(item => {
            // console.log("majang"+item.attendanceTime.toDate())
            // ((item.email === user.email ) && (item.length === 1)) ? console.log(item.email) : console.log('haduuhh')
            (moment().format('LL') === moment(item.attendanceTime.toDate()).format('LL')) && user.email === item.email && item.email.length === 1 ? console.log(item.email) : null
              // moment().format('LL') === moment(item.attendanceTime.toDate()).format('LL')) && (user.email && item.length === 1 ) && null
            
            // ((moment().format('LL') === moment(item.attendanceTime.toDate()).format('LL')) &&  (user.email && item.length === 1 )) &&
            //   null
          }) 
        }
        <Button
          style={styles.bottomAbsensi}
          onPress={() => navigation.navigate('FotoAbsensiSiswa')}>
          Hadir
        </Button>
        <Button
          style={styles.bottomAbsensi}
          onPress={() =>
            Alert.alert(
              'Izin Tidak Masuk Sekolah',
              'Harap melakukan konfirmasi ke nomor Whatsapp ini: 08233425345',
            )
          }>
          Izin
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1890FF',
    alignItems: 'center',
  },
  bottom: {
    flex: 2,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: '100%',
  },
  input: {
    paddingBottom: 10,
  },
  textForgot: {
    marginTop: 10,
  },
  image: {
    marginBottom: 30,
    marginTop: 80,
  },
  bottomAbsensi: {
    marginBottom: 20,
  },
});

export default AbsensiSiswa;
