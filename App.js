import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as Font from 'expo-font';
Font.loadAsync({
  'Bold': require('./assets/fonts/SpoqaHanSansNeo-Bold.otf'),
  'Light': require('./assets/fonts/SpoqaHanSansNeo-Light.otf'),
  'Medium': require('./assets/fonts/SpoqaHanSansNeo-Medium.otf'),
  'Regular': require('./assets/fonts/SpoqaHanSansNeo-Regular.otf'),
  'Thin': require('./assets/fonts/SpoqaHanSansNeo-Thin.otf'),
});
import BottomNavigator from './src/Components/Navigation/BottomNavi';
import Loading from './src/Screens/Loading';
import StorePage from './src/Screens/StorePage';
import StoreList from './src/Screens/StoreList';
import MiddleCat from './src/Screens/MiddleCat';
import Login from './src/Screens/Login';
import SignUp from './src/Screens/SignUp';
import MyInfoEdit from './src/Screens/InfoEdit';
import Welcome from './src/Screens/Welcome';
import { Dimensions } from 'react-native';
const Stack = createStackNavigator();

const { width, height } = Dimensions.get('window');
console.log("width :", width, "height :", height);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          backgroundColor: '#FFFFFF',
        }}
      >

        <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="MyInfoEdit" component={MyInfoEdit} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="MiddleCat" component={MiddleCat} />
        <Stack.Screen name="StoreList" component={StoreList} />
        <Stack.Screen name="StorePage" component={StorePage} />
      </Stack.Navigator>
    </NavigationContainer >
  );
}

export default App;