import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import Home from './screens/Home';
// import Search from './screens/Search';
// import MyPage from './screens/MyPage';

import BottomNavigator from './components/Navigator';
import Login from './screens/Login';
import SignUp from './screens/SignUp';

const Stack = createStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignUp"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
        <Stack.Screen name="Login" component={Login} /> 
        <Stack.Screen name="SignUp" component={SignUp} /> 
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;