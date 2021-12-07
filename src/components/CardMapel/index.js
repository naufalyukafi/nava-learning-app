import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Text, Button} from '@ui-kitten/components';
const CardMapel = props => {
  return (
    <View style={[styles.btnLesson, {backgroundColor: props.bgLesson}]}>
      <Text style={{fontWeight: 'bold', color: 'black'}}>
        {props.lessonName}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  btnLesson: {
    height: 120,
    borderRadius: 50,
    backgroundColor: 'white',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CardMapel;
