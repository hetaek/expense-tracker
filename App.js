import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ApiSrv from './ApiKeys';
import * as firebase from 'firebase';
import { TransItem } from './View/Main';

firebase.initializeApp(ApiSrv.firebaseConfig);

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Expense Tracker
      </Text>
      <TouchableOpacity
        onPress={() => alert('Hello, world!')}
        style={styles.button}>
        <Text style={styles.buttonText}>Add/Modify an item</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'green',
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
  text: {
    color: '#888',
    fontSize: 24,
  },
});



