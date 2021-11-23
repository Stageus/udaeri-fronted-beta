import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

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

const Stack = createStackNavigator();

const App = () => {
  const [loaded, setLoaded] = useState(false);

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

  useEffect(() => {
    preLoad();
  }, []);

  return loaded ? (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          backgroundColor: "#FFFFFF",
        }}
      >
        <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="EmailLogin" component={EmailLogin} />
        <Stack.Screen name="SignUpID" component={SignUpID} />
        <Stack.Screen name="SignUpPW" component={SignUpPW} />
        <Stack.Screen name="SignUpNickname" component={SignUpNickname} />
        <Stack.Screen name="SignUpPhone" component={SignUpPhone} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="MiddleCat" component={MiddleCat} />
        <Stack.Screen name="StoreList" component={StoreList} />
        <Stack.Screen name="StorePage" component={StorePage} />
      </Stack.Navigator>
    </NavigationContainer>
  ) : (
    <></>
  );
};

export default App;
