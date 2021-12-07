import React, {useState} from 'react';
import {
  View,
  Alert,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Text, Button} from '@ui-kitten/components';
import {CardMapelScreen} from '../../../../components';
const MataPelajaran = ({navigation}) => {
  const [mapel, setMapel] = useState([
    {
      id: 1,
      name: 'Tematik',
    },
    {
      id: 2,
      name: 'Bahasa Inggris',
    },
    {
      id: 3,
      name: 'Agama Islam',
    },
  ]);
  return (
    <View style={styles.wrapper}>
      {mapel.map(item => (
        <TouchableOpacity
          onPress={() => navigation.navigate('DetailMataPelajaran')}
          key={item.id}>
          <CardMapelScreen lessonName={item.name} bgLesson="#1890FF" />
        </TouchableOpacity>
      ))}
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

export default MataPelajaran;
