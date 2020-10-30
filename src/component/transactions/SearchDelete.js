import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Button, TextInput, FlatList, Alert } from 'react-native';

import 'firebase/firestore';
import * as firebase from 'firebase';

import styles from '../../../Styles'

const db = firebase.firestore().collection('expense_tracker');

export default function SearchDeleteExpense ({ navigation }) {
  const [fromDate, setFromDate] = useState()
  const [toDate, setToDate] = useState()
  const [data, setData] = useState([])

  const onSearch = () => {
    const subscriber = db
      .orderBy("date", "desc")
      .where('date', '>=', fromDate)
      .where('date', '<=', toDate)
      .get()
      .then(querySnapshot => {
        const data = [];
        querySnapshot.forEach(documentSnapshot => {
          data.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setData(data);
      });

    return () => subscriber();
  }
  const onDelete = (key) => {
    const subscriber = db
      .doc(key)
      .delete()
      .then(() => {
        Alert.alert(
          "Successful!",
          "You deleted this item!",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
        );
      })

    return () => subscriber();
  }
  return (
    <>
      <View style={styles.searchContainer}>
        <Text style={styles.searchText}>From:</Text>
        <TextInput name={'date'} style={styles.searchText} value={fromDate} placeholderTextColor={"red"} 
                   placeholder="Which date?" onChangeText={fromDate => {setFromDate(fromDate)}} />
        <Text style={styles.searchText}>To:</Text>
        <TextInput name={'date'} style={styles.searchText} value={toDate} placeholderTextColor={"red"} 
                   placeholder="Which date?" onChangeText={toDate => {setToDate(toDate)}} />
        <TouchableOpacity
          onPress={() => onSearch()}
          style={styles.searchButton}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.navigationContainer}>
            <Text style={styles.searchText}>Date: {item.date}</Text>
            <Text style={styles.searchText}>Amount: ${item.amount}</Text>
            <Text style={styles.searchText}>Category: {item.category}</Text>
            <Text style={styles.searchText}>Item: {item.item}</Text>
            <Text style={styles.searchText}>Payment Type: {item.type}</Text>
            <Text style={styles.searchText}>Comment: {item.comments}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Modify', {
                changeDate: item.date,
                changeAmount: JSON.stringify(item.amount),
                changeCategory: item.category,
                changeItem: item.item,
                changeType: item.type,
                changeComment: item.comments,
                key: item.key,
              })}
              style={styles.modifyButton}>
              <Text style={styles.modifyButtonText}>Modify</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onDelete(item.key)}
              style={styles.modifyButton}>
              <Text style={styles.modifyButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.navigationContainer}>
        <Button title="Add" onPress={() => navigation.navigate('Add')} />
        <Button title="Home" onPress={() => navigation.navigate('Home')} />
      </View>
    </>
  );
}