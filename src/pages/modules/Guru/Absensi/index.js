import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Text} from '@ui-kitten/components';
import {CardScreen, LoadingScreen} from '../../../../components';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

const GetAbsensi = () => {
  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(true);
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
              const {email, image, status, attendanceTime} = doc.data();
              list.push({
                id: doc.id,
                email,
                image,
                status,
                attendanceTime,
              });
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
  }, []);
  return (
    <View style={styles.container}>
      <Text>Tanggal: {moment().format('LL')}</Text>
      <View style={{height: 3, backgroundColor: 'gray', marginTop: 10}} />
      {loading ? (
        <LoadingScreen />
      ) : (
        <FlatList
          data={attendance}
          renderItem={({item}) => <CardScreen item={item} />}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          style={{marginBottom: 20}}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
});

export default GetAbsensi;
