import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text} from '@ui-kitten/components';
import moment from 'moment';
const Card = ({item}) => {
  return (
    <View style={styles.wrapper}>
      {moment().format('LL') ===
        moment(item.attendanceTime.toDate()).format('LL') && (
        <>
          <View style={styles.contentImage}>
            <Image source={{uri: item.image}} style={styles.image} />
          </View>
          <View style={styles.contentDesc}>
            <Text style={styles.text}>{item.email}</Text>
            <Text style={styles.text}>
              {moment(item.attendanceTime.toDate()).fromNow()}
            </Text>
          </View>
          <View
            style={{height: 3, backgroundColor: '#1890FF', marginTop: 10}}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  cardTitle: {
    height: 50,
    backgroundColor: '#1890FF',
    justifyContent: 'center',
    paddingLeft: 20,
    marginTop: 15,
  },
  contentImage: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    alignContent: 'center',
    marginBottom: 20,
    zIndex: 2,
  },
  image: {
    marginTop: 10,
    height: 180,
    width: 150,
    borderColor: '#fff',
    borderWidth: 4,
  },
  contentDesc: {
    paddingLeft: 5,
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    backgroundColor: '#1890FF',
    color: '#fff',
    height: 150,
    zIndex: 1,
    marginTop: -50,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default Card;
