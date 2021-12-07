/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import firebase from '@react-native-firebase/app';
import Router from './src/router'


const App = () => {

  var firebaseConfig = {
    apiKey: "AIzaSyCdypIJxkJIhTT8dyLKxfPfht31XkEf0so",
    authDomain: "molidu-v1.firebaseapp.com",
    projectId: "molidu-v1",
    storageBucket: "molidu-v1.appspot.com",
    messagingSenderId: "736070341526",
    appId: "1:736070341526:web:4a82a56e20f408f60643b7",
    measurementId: "G-M8XQPQ3913"
  };

  if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <Router />
      </ApplicationProvider>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
