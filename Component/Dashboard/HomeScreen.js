import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function Dashboard() {
  function homeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Add')}
          style={styles.button}>
          <Text style={styles.buttonText}>Add/Modify an item</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('All')}
          style={styles.button}>
          <Text style={styles.buttonText}>See entire list</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function addExpense({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="See entire list" onPress={() => navigation.navigate('All')} />
        <Button title="Go to Dashboard" onPress={() => navigation.goBack()} />
      </View>
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

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={homeScreen}
            options={{ title: 'Dashboard' }}
          />
          <Stack.Screen name="Add" component={addExpense} />
          <Stack.Screen name="All" component={allExpenses} />

        </Stack.Navigator>
      </NavigationContainer>
      <View style={styles.container}>
      </View>
    </>
  );
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