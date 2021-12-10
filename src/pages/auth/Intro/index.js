import React from 'react';
import {View, StyleSheet, Image, Alert} from 'react-native';
import {Button, Text, Icon} from '@ui-kitten/components';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Intro = ({navigation}) => {
  const GoogleIcon = props => <Icon name="google" {...props} />;

  async function onGoogleButtonPress() {
    try {
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // Sign-in the user with the credential
      await auth().signInWithCredential(googleCredential);
      await navigation.navigate('HomeScreen');
      Alert.alert('Sukses Login!', 'Anda berhasil masuk');
    } catch (error) {
        Alert.alert('Login gagal'+ error);
    }
  }

  return (
    <View style={styles.wrapper}>
      {/* <Text
        style={{
          textAlign: 'center',
          color: '#E5E1E1',
          fontWeight: 'bold',
          fontSize: 25,
          marginTop: 2,
          marginBottom: 25,
        }}>
        Nava Learning
      </Text> */}
      <View style={styles.top}>
      <Image
        source={require('../../../assets/images/welcome.png')}
        style={styles.image}
      />
      </View>
      <View style={styles.bottom}>
        {/* <Button onPress={() => navigation.navigate('LoginScreen')}>
          Masuk
        </Button>
        <Text style={styles.textOr}>Atau</Text>
        <Button onPress={() => navigation.navigate('SignupScreen')}>
          Daftar
        </Button>     */}

        <Text
          style={{
          textAlign: 'center',
          color: 'black',
          fontWeight: 'bold',
          fontSize: 25,
          marginTop: 1,
          marginBottom: 25,
        }}>
          Nava learning
        </Text>
        <Text
          style={{
          textAlign: 'center',
          color: '#b4b4b4',
          fontWeight: 'bold',
          fontSize: 18,
          marginBottom: 25
        }}>
          Make your online learning more easier and structurer!
        </Text>
        <View style={styles.btnCotnainer}>
          <Button style={styles.button} onPress={() => navigation.navigate('LoginScreen')}>GET STARTED</Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({ 
  wrapper: {
    flex: 1,
    // backgroundColor: '#1890FF',
    alignItems: 'center',
  },
  image: {
    marginBottom: 40,
  },
  top: {
    flex: 2,
    backgroundColor: '#1890FF',
    width: '100%',
    borderBottomRightRadius: 55
  },
  bottom: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
    borderTopLeftRadius: 45,
    width: '100%',
  },
  textOr: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
  },
  btnGoogle: {
    backgroundColor: '#4367B2',
    marginTop: 10,
    marginBottom: 10,
  },
  span: {
    color: '#41A4FF',
    fontWeight: 'bold',
  },
  btnCotnainer: {
    flexDirection: 'row-reverse',
  },
  button: {
    backgroundColor: '#ff6374',
    borderRadius: 20,
    borderColor: 'white',
    paddingTop: 20,
    paddingBottom: 20,
    
  }
});

export default Intro;
