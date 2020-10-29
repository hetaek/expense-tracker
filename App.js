import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, TouchableOpacity, Button, TextInput, FlatList, Alert, ActivityIndicator } from 'react-native';

import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

import FirebaseConfig from './ApiKeys'
import styles from './Styles'
import Login from './src/component/auth/Login';
import HomeScreen from './src/component/dashboard/HomeScreen';


if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseConfig);
}

//FIRESTORE QUERY
const db = firebase.firestore().collection('expense_tracker');

const Stack = createStackNavigator();

//SEARCH/MODIFY
const SearchModifyExpense = ({ navigation }) => {
  const [fromDate, setFromDate] = useState()
  const [toDate, setToDate] = useState()
  const [data, setData] = useState([])

  const handleFromDate = (fromDate) => {
    setFromDate(fromDate)
  }

  const handleToDate = (toDate) => {
    setToDate(toDate)
  }

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
        <TextInput name={'date'} style={styles.searchText} value={fromDate} placeholderTextColor={"red"} placeholder="Which date?" onChangeText={handleFromDate} />
        <Text style={styles.searchText}>To:</Text>
        <TextInput name={'date'} style={styles.searchText} value={toDate} placeholderTextColor={"red"} placeholder="Which date?" onChangeText={handleToDate} />
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
                changeAmount: item.amount,
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
        <Button title="Search/Modify" onPress={() => navigation.navigate('All')} />
        <Button title="Home" onPress={() => navigation.navigate('Home')} />
      </View>
    </>
  );
}

//MODIFY
const ModifyExpense = ({ route, navigation: { setParams } }) => {
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
    if (changeAmount === '') {
      changeAmount = 1;
    }
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
        amount: changeAmount,
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

    // return () => subscriber();
  };


  return (
    <>
      <View style={styles.navigationContainer}>
        <TextInput name={'date'} style={styles.searchText} value={changeDate} placeholderTextColor={"red"} placeholder="Enter date..." onChangeText={handleDate} />
        <TextInput name={'amount'} style={styles.searchText} value={JSON.stringify(parseFloat(changeAmount))} keyboardType="numeric" placeholderTextColor={"red"} placeholder="Enter amount...(add - for expense)" onChangeText={handleAmount} />
        <TextInput name={'item'} style={styles.searchText} value={changeItem} placeholderTextColor={"red"} placeholder="Enter item description..." onChangeText={handleItem} />
        <TextInput name={'category'} style={styles.searchText} value={changeCategory} placeholderTextColor={"red"} placeholder="Enter category..." onChangeText={handleCategory} />
        <TextInput name={'type'} style={styles.searchText} value={changeType} placeholderTextColor={"red"} placeholder="Enter payment type..." onChangeText={handleType} />
        <TextInput name={'comments'} style={styles.searchText} value={changeComment} placeholderTextColor={"red"} placeholder="Enter comments..." onChangeText={handleComment} />
        <TouchableOpacity
          onPress={() => onSubmit()}
          style={styles.searchButton}>
          <Text style={styles.buttonText}>Modify</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerLeft: null }} />
        <Stack.Screen name="Add" component={AddExpense} options={{ title: "Add" }} />
        <Stack.Screen name="All" component={SearchModifyExpense} options={{ title: "Search/Modify" }} />
        <Stack.Screen name="Modify" component={ModifyExpense} options={{ title: "Modify" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}








