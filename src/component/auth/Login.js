import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';

import * as firebase from 'firebase';
import 'firebase/firestore';
import styles from '../../../Styles'

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => navigation.navigate('Home'))
      .catch(error => console.log(error))
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.logo}>Expense Tracker</Text>
        <View style={styles.inputView} >
          <TextInput
            style={styles.inputBox}
            value={email}
            onChangeText={setEmail}
            placeholder='Email'
            autoCapitalize='none' />
        </View>
        <View style={styles.inputView} >
          <TextInput
            style={styles.inputBox}
            value={password}
            onChangeText={setPassword}
            placeholder='Password'
            secureTextEntry={true}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
          <Text style={styles.loginBtn}>Login</Text>
        </TouchableOpacity>
      </View >
    </>
  )
}

