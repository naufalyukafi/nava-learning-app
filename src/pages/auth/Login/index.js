import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {Button, Text, Icon, Input} from '@ui-kitten/components';
import auth from '@react-native-firebase/auth';

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
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

  const onLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail('');
        setPassword('');
        Alert.alert('Sukses Login!', 'Anda berhasil masuk akun molidu');
        navigation.navigate('HomeScreen');
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
          paddingTop: '35%',
          paddingBottom: 20,
          fontSize: 25,
          marginBottom: 10,
        }}>
        Sign In
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
          caption="At least 6 characters"
          accessoryRight={renderIcon}
          captionIcon={AlertIcon}
          secureTextEntry={secureTextEntry}
          onChangeText={nextValue => setPassword(nextValue)}
          style={styles.input}
        />
        <Button style={{marginTop: 20, width: '100%'}} onPress={() => onLogin()}>Sign In</Button>
        <TouchableOpacity onPress={() => alert('Silahkan reset email anda dengan mengirim pesan ke email: navalearning@gmail.com')}><Text style={styles.textForgot}>Forgot Password?</Text></TouchableOpacity>    
    </View>
    <View style={{justifyContent: 'flex-end'}}>
      <Text style={styles.signup}>Don't have an account? <Text onPress={() => navigation.navigate('SignupScreen')} style={styles.span}>Create new one</Text></Text>
    </View>
    </View>
    
  )};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingLeft: 40,
    paddingRight: 40
  },
  bottom: {
    flex: 2,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: '100%',
  },
  input: {
    paddingBottom: 10,
  },
  textForgot: {
    marginTop: 10,
  },
  signup: {
    marginTop: '50%',
    textAlign: 'center'
  },
  span: {
    fontWeight: 'bold',
    color: '#1890FF'
  }
});

export default Login;
