import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';

import 'firebase/firestore';
import * as firebase from 'firebase';

import styles from '../../../Styles'

const db = firebase.firestore().collection('expense_tracker');

export default function ModifyExpense({ route, navigation: { setParams } }) {
  const [loading, setLoading] = useState(true);
  const { changeDate } = route.params;
  const { changeAmount } = route.params;
  const { changeItem } = route.params;
  const { changeCategory } = route.params;
  const { changeType } = route.params;
  const { changeComment } = route.params;
  const { key } = route.params;

  const handleDate = (changeDate) => {
    setParams({ changeDate })
  }

  const handleAmount = (changeAmount) => {
    setParams({ changeAmount })
  }

  const handleItem = (changeItem) => {
    setParams({ changeItem })
  }

  const handleCategory = (changeCategory) => {
    setParams({ changeCategory })
  }

  const handleType = (changeType) => {
    setParams({ changeType })
  }

  const handleComment = (changeComment) => {
    setParams({ changeComment })
  }

  const onSubmit = () => {

    const subscriber = db
      .doc(key)
      .update({
        date: changeDate,
        amount: Number(changeAmount),
        item: changeItem,
        category: changeCategory,
        type: changeType,
        comments: changeComment,
      })
      .then(() => {
        Alert.alert(
          "Successful!",
          "You changed this item!",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
        );
      })
    setLoading(false);

    return () => subscriber();
  };


  return (
    <>
      <View style={styles.container}>
        <TextInput name={'date'} style={styles.textInput} value={changeDate} 
                   placeholderTextColor={"red"} placeholder="Enter date..." onChangeText={handleDate} />
        <TextInput name={'amount'} style={styles.textInput} value={changeAmount} 
                   keyboardType="numeric" placeholderTextColor={"red"} placeholder="Enter amount...(add - for expense)" onChangeText={handleAmount} />
        <TextInput name={'item'} style={styles.textInput} value={changeItem} placeholderTextColor={"red"} 
                   placeholder="Enter item description..." onChangeText={handleItem} />
        <TextInput name={'category'} style={styles.textInput} value={changeCategory} 
                   placeholderTextColor={"red"} placeholder="Enter category..." onChangeText={handleCategory} />
        <TextInput name={'type'} style={styles.textInput} value={changeType} 
                   placeholderTextColor={"red"} placeholder="Enter payment type..." onChangeText={handleType} />
        <TextInput name={'comments'} style={styles.textInput} value={changeComment} 
                   placeholderTextColor={"red"} placeholder="Enter comments..." onChangeText={handleComment} />
        <TouchableOpacity
          onPress={() => onSubmit()}
          style={styles.button}>
          <Text style={styles.buttonText}>Modify</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}