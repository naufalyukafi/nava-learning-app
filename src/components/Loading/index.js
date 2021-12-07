import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Spinner, Text} from '@ui-kitten/components';

const Loading = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.infoText}>Mohon Tunggu Sebentar...</Text>
      <Spinner size="giant" status="info" />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    marginBottom: 10,
  },
});

export default Loading;
