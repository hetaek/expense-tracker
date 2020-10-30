import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/component/auth/Login';
import HomeScreen from './src/component/dashboard/HomeScreen';
import AddExpense from './src/component/transactions/AddExpense';
import SearchDelete from './src/component/transactions/SearchDelete';
import SearchModify from './src/component/transactions/SearchModify';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerLeft: null }} />
        <Stack.Screen name="Add" component={AddExpense} options={{ title: "Add" }} />
        <Stack.Screen name="All" component={SearchDelete} options={{ title: "Search/Modify" }} />
        <Stack.Screen name="Modify" component={SearchModify} options={{ title: "Modify" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}








