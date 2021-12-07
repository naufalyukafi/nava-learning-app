import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Text} from '@ui-kitten/components';
import {CardGuruScreen} from '../../../../../components';

const TugasGuru = () => {
  return (
    <View style={styles.container}>
      <Text>Mata Pelajaran: Matematika</Text>
      <View style={{height: 3, backgroundColor: 'gray', marginTop: 10}} />
      <ScrollView>
        <CardGuruScreen name="paijo" status="Hadir" />
        <CardGuruScreen name="Paijo Supratman" status="Hadir" />
        <CardGuruScreen name="Sukiyem Leobi" status="Hadir" />
      </ScrollView>
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
export default TugasGuru;
