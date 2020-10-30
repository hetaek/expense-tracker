import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Button, TextInput, Alert } from 'react-native';

import 'firebase/firestore';
import * as firebase from 'firebase';

import styles from '../../../Styles'

const db = firebase.firestore().collection('expense_tracker');

export default function AddExpense({ navigation }) {
  let [amount, setAmount] = useState('')
  const [category, setCategory] = useState()
  const [comment, setComment] = useState()
  const [date, setDate] = useState()
  const [item, setItem] = useState()
  const [type, setType] = useState()
  const [loading, setLoading] = useState(true);

  const onSubmit = () => {

    const subscriber = db.add({
      date: date,
      amount: amount,
      item: item,
      category: category,
      type: type,
      comments: comment,
    })
      .then(() => {
        Alert.alert(
          "Successful!",
          "You added an item!",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
        );
      })
    setLoading(false);
    setDate()
    setAmount('')
    setItem()
    setCategory()
    setType()
    setComment()
    return () => subscriber();
  };


  return (
    <>
      <View style={styles.container}>
        <TextInput name={"date"} style={styles.textInput} value={date} placeholderTextColor={"red"} 
                   placeholder="Enter date..." onChangeText={date => {setDate(date)}} />
        <TextInput name={"amount"} style={styles.textInput} value={amount} 
                   keyboardType="numeric" placeholderTextColor={"red"} placeholder="Enter amount...(add - for expense)" 
                   onChangeText={amount => {setAmount(parseFloat(amount))}} />
        <TextInput name={"item"} style={styles.textInput} value={item} placeholderTextColor={"red"} 
                   placeholder="Enter item description..." onChangeText={item => {setItem(item)}} />
        <TextInput name={"category"} style={styles.textInput} value={category} placeholderTextColor={"red"} 
                   placeholder="Enter category..." onChangeText={category => {setCategory(category)}} />
        <TextInput name={"type"} style={styles.textInput} value={type} placeholderTextColor={"red"} 
                   placeholder="Enter payment type..." onChangeText={type => {setType(type)}} />
        <TextInput name={"comments"} style={styles.textInput} value={comment} placeholderTextColor={"red"} 
                   placeholder="Enter comments..." onChangeText={comment => {setComment(comment)}} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => onSubmit()}
          style={styles.button}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.navigationContainer}>
        <Button title="Search/Modify" onPress={() => navigation.navigate('All')} />
        <Button title="Home" onPress={() => navigation.goBack()} />
      </View>
    </>
  );
}