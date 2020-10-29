import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, TextInput, FlatList, ActivityIndicator } from 'react-native';
import 'firebase/firestore';
import * as firebase from 'firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import firebase from './ApiKeys';

const db = firebase.firestore().collection('expense_tracker');

const allExpenses = ({ navigation }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState([])

  useEffect(() => {
    const subscriber = db
      .onSnapshot(querySnapshot => {
        const data = [];

        querySnapshot.forEach(documentSnapshot => {
          data.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setData(data);
        setLoading(false);
      });

    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <View style={{ height: 500, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Date: {item.date}</Text>
          <Text>Amount: ${item.amount}</Text>
          <Text>Category: {item.category}</Text>
          <Text>Date: {item.date}</Text>
          <Text>Item: {item.item}</Text>
          <Text>Payment Type: {item.type}</Text>
          <Text>Comment: {item.comments}</Text>
        </View>
      )}
    />
    
    <Button title="Add/Modify an item" onPress={() => navigation.goBack()} />
    <Button title="Go to Dashboard" onPress={() => navigation.navigate('Home')} />

  );
}

function allExpenses({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Add/Modify an item" onPress={() => navigation.goBack()} />
      <Button title="Go to Dashboard" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}