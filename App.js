import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import Login from './Component/Auth/Login'
import Dashboard from './Component/Dashboard/HomeScreen'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return <Dashboard />

  // return (
  //   <>
  //     <NavigationContainer>
  //       <Stack.Navigator initialRouteName="Home">
  //         <Stack.Screen
  //           name="Home"
  //           component={Dashboard.homeScreen}
  //           options={{ title: 'Expense Tracker' }}
  //         />
  //         <Stack.Screen name="Details" component={Dashboard.addExpense} />
  //       </Stack.Navigator>

  //     </NavigationContainer>
  //     <View style={styles.container}>
  //       {/* <Text style={styles.text}>
  //       Expense Tracker
  //   </Text> */}
  //       <TouchableOpacity
  //         onPress={() => navigation.navigate('addExpense')}
  //         style={styles.button}>
  //         <Text style={styles.buttonText}>Add/Modify an item</Text>
  //       </TouchableOpacity>
  //     </View>
  //   </>
  // );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
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





