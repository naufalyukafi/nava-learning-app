import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {Button, Text, Icon, Input} from '@ui-kitten/components';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const Signup = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const AlertIcon = props => <Icon {...props} name="alert-circle-outline" />;

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = props => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const onDaftar = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firestore()
          .collection('Users')
          .add({
            email,
          })
          .then(() => {
            Alert.alert(
              'Daftar Sukses',
              'Selamat anda telah terdaftar di molidu',
            );
            setEmail('');
            setPassword('');
            navigation.navigate('HomeScreen');
          })
          .catch(error => {
            console.error(error);
          });
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          Alert.alert('Email Anda salah', 'Sepertinya email yang anda masukan salah, mohon segera koreksi kembali!');
        } else if(error.code === 'auth/user-not-found') {
          Alert.alert('User tidak ditemukan', 'Sepertinya alamat email yang anda masukan tidak terdaftar di sistem, mohon koreksi kembali!')
        } else if(error.code === 'auth/wrong-password') {
          Alert.alert('Password Anda salah', 'Sepertinya passwod yang anda masukan salah, mohon segera koreksi kembali!')
        } else {
          Alert.alert(error.code);
        }
        
      });
  };

  return (
    <View style={styles.container}>
      <View>
      <Text
        style={{
          color: 'black',
          fontWeight: 'bold',
          paddingTop: '15%',
          paddingBottom: 20,
          fontSize: 25,
          marginBottom: 10,
        }}>
        Sign Up
      </Text>
      
        <Input
          value={email}
          label="Email"
          placeholder="Input Email"
          onChangeText={nextValue => setEmail(nextValue)}
          style={styles.input}
        />
        <Input
          value={password}
          label="Password"
          placeholder="Input Password"
          caption="At Least 6 characters"
          accessoryRight={renderIcon}
          captionIcon={AlertIcon}
          secureTextEntry={secureTextEntry}
          onChangeText={nextValue => setPassword(nextValue)}
          style={styles.input}
        />
        <Button style={{marginTop: 20, width: '100%'}} onPress={() => onDaftar()}>Sign Up</Button>
      </View>
      <View>
      <View></View>
      <Text style={{ textAlign: 'center', marginTop: '63%' }}> Have an account? <Text onPress={() => navigation.navigate('LoginScreen')} style={styles.span}>Login</Text></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingLeft: 40,
    paddingRight: 40
  },
 
  input: {
    paddingBottom: 10,
  },

  span: {
    fontWeight: 'bold',
    color: '#1890FF'
  }
  
});

export default Signup;
