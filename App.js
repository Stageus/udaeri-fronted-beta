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

import Loading from './src/Screens/Loading';
import StorePage from './src/Screens/StorePage';
import StoreList from './src/Screens/StoreList';
import MiddleCat from './src/Screens/MiddleCat';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
        backgroundColor: '#FFFFFF',
      }}>
        <Stack.Screen name="MiddleCat" component={MiddleCat} />
        <Stack.Screen name="StoreList" component={StoreList} />
        <Stack.Screen name="StorePage" component={StorePage} />
      </Stack.Navigator>
    </NavigationContainer >
  );
}

export default App;