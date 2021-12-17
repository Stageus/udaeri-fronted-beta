import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { store } from "./store/index";
import { Provider, useSelector, useDispatch } from "react-redux";

import { StatusBar, Platform, View } from 'react-native';
import { restoreToken } from "./reducer/index";

import * as Font from "expo-font";

Font.loadAsync({
  Bold: require("./assets/fonts/SpoqaHanSansNeo-Bold.otf"),
  Light: require("./assets/fonts/SpoqaHanSansNeo-Light.otf"),
  Medium: require("./assets/fonts/SpoqaHanSansNeo-Medium.otf"),
  Regular: require("./assets/fonts/SpoqaHanSansNeo-Regular.otf"),
  Thin: require("./assets/fonts/SpoqaHanSansNeo-Thin.otf"),
});

import BottomNavigator from "./src/Components/Navigation/BottomNavigator";
import Loading from "./src/Screens/Loading";
import Home from "./src/Screens/Home";
import StorePage from "./src/Screens/StorePage";
import StoreList from "./src/Screens/StoreList";
import MiddleCat from "./src/Screens/MiddleCat";
import Login from "./src/Screens/Login";
import EmailLogin from "./src/Screens/EmailLogin";
import SignUpID from "./src/Screens/SignUp/ID";
import SignUpPW from "./src/Screens/SignUp/PW";
import SignUpNickname from "./src/Screens/SignUp/Nickname";
import SignUpPhone from "./src/Screens/SignUp/Phone";
import Welcome from "./src/Screens/Welcome";
import Search from "./src/Screens/Search";
import Map from "./src/Screens/Map";
import MyPage from "./src/Screens/MyPage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

const App = () => {
  const [loaded, setLoaded] = useState(false);

  const TOKEN_KEY = "@userKey";
  const dispatch = useDispatch();

  const preLoad = async () => {
    try {
      await Font.loadAsync({
        Bold: require("./assets/fonts/SpoqaHanSansNeo-Bold.otf"),
        Light: require("./assets/fonts/SpoqaHanSansNeo-Light.otf"),
        Medium: require("./assets/fonts/SpoqaHanSansNeo-Medium.otf"),
        Regular: require("./assets/fonts/SpoqaHanSansNeo-Regular.otf"),
        Thin: require("./assets/fonts/SpoqaHanSansNeo-Thin.otf"),
      });
      setTimeout(() => {
        setLoaded(true);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const bootstrapAsync = async () => {
    let userToken;
    try {
      userToken = await AsyncStorage.getItem(TOKEN_KEY);
    } catch (e) {
      console.log("토큰을 가져오지 못했어유");
    }
    dispatch(restoreToken(userToken));
  };

  useEffect(() => {
    preLoad();
    bootstrapAsync();
  }, []);

  const tokentoken = useSelector((state) => state.userToken);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!loaded ? (
          <Stack.Screen name="Loading" component={Loading} />
        ) : tokentoken == null ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="EmailLogin" component={EmailLogin} />
            <Stack.Screen name="SignUpID" component={SignUpID} />
            <Stack.Screen name="SignUpPW" component={SignUpPW} />
          </>
        ) : (
          <>
            <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="MiddleCat" component={MiddleCat} />
            <Stack.Screen name="StoreList" component={StoreList} />
            <Stack.Screen name="StorePage" component={StorePage} />
            <Stack.Screen name="Map" component={Map} />
            <Stack.Screen name="MyPage" component={MyPage} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
export default AppWrapper;
