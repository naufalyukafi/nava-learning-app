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
      Alert.alert('Sukses Login!', 'Anda berhasil masuk akun molidu');
    } catch (error) {
        Alert.alert('Login gagal'+ error);
    }
  }

  return (
    <View style={styles.wrapper}>
      <Text
        style={{
          textAlign: 'center',
          color: '#E5E1E1',
          fontWeight: 'bold',
          fontSize: 25,
          marginTop: 25,
          marginBottom: 25,
        }}>
        Molidu Education
      </Text>
      <Image
        source={require('../../../assets/images/icon-image.png')}
        style={styles.image}
      />
      <View style={styles.bottom}>
        <Button onPress={() => navigation.navigate('LoginScreen')}>
          Masuk
        </Button>
        <Text style={styles.textOr}>Atau</Text>
        <Button onPress={() => navigation.navigate('SignupScreen')}>
          Daftar
        </Button>
        <Button
          style={styles.btnGoogle}
          accessoryLeft={GoogleIcon}
          onPress={() => onGoogleButtonPress()}>
          Masuk dengan Google
        </Button>
        <Text style={styles.textPriv}>
          Dengan masuk atau mendaftar, Anda menyetujui
          <Text style={styles.span}> Ketentuan Layanan</Text> dan{' '}
          <Text style={styles.span}>Kebijakan Privasi</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#1890FF',
    alignItems: 'center',
  },
  image: {
    marginBottom: 40,
  },
  bottom: {
    flex: 3,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
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
});

export default Intro;
