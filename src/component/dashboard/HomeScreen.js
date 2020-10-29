import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, Button } from 'react-native';

import * as firebase from 'firebase';
import 'firebase/firestore';

import FirebaseConfig from '../../../ApiKeys'
import styles from '../../../Styles'

if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseConfig);
}

const db = firebase.firestore().collection('expense_tracker');

export default function HomeScreen({ navigation }) {
  const [balance, setBalance] = useState([])
  const [loading, setLoading] = useState([])
  useEffect(() => {
    const subscriber = db.onSnapshot(querySnapshot => {
      const data = [];
      querySnapshot.forEach(documentSnapshot => {
        data.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
      });
      const amounts = data.map(item => item.amount);
      const total = amounts.reduce((acc, item) => (acc += item))
      setBalance(total);
      setLoading(false);
      return () => subscriber();
    });
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.logo}>Expense Tracker</Text>
        <Text style={styles.balanceText}>Balance:</Text>
        <Text style={styles.text}>${balance}</Text>
      </View>
      <View style={styles.navigationContainer}>
        <Button title="Add" onPress={() => navigation.navigate('Add')} />
        <Button title="Search/Modify" onPress={() => navigation.navigate('All')} />
      </View>

    </>
  );
}