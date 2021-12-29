import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { store } from "./store/index";
import { Provider, useSelector, useDispatch } from "react-redux";
import { restoreToken, checkToken } from "./reducer/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
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
import KakaoLogin from "./src/Screens/Social/Login/Kakao/index";
import KakaoLogout from "./src/Screens/Social/Logout/Kakao/index";
import NaverLogin from "./src/Screens/Social/Login/Naver/index";
import JjimPage from "./src/Screens/Jjim/index";

const Stack = createStackNavigator();

const App = () => {
  const [loaded, setLoaded] = useState(false);

  const dispatch = useDispatch();

  const preLoad = async () => {
    try {
      await Font.loadAsync({
        Bold: require("./assets/fonts/SpoqaHanSansNeo-Bold.otf"),
        Light: require("./assets/fonts/SpoqaHanSansNeo-Light.otf"),
        Medium: require("./assets/fonts/SpoqaHanSansNeo-Medium.otf"),
        Regular: require("./assets/fonts/SpoqaHanSansNeo-Regular.otf"),
        Thin: require("./assets/fonts/SpoqaHanSansNeo-Thin.otf"),
      }).then(() => {
        setLoaded(true);
      });
    } catch (error) {
      console.log("폰트 로딩 실패" + error);
    }
  };

  const getStorageToken = async () => {
    let userToken;
    try {
      userToken = await getToken();
      dispatch(checkToken(true));
    } catch (e) {
      console.log("토큰을 가져오지 못했어요");
    }
  };

  const TOKEN_KEY = "@userKey";
  const getToken = async () => {
    return await AsyncStorage.getItem(TOKEN_KEY);
  };

  // const token = useSelector((state) => state.userToken);
  const tokenCheck = useSelector((state) => state.tokenCheck);

  useEffect(() => {
    preLoad();
    getStorageToken();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!loaded ? (
          <Stack.Screen name="Loading" component={Loading} />
        ) : !tokenCheck ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="EmailLogin" component={EmailLogin} />
            <Stack.Screen name="SignUpID" component={SignUpID} />
            <Stack.Screen name="SignUpPW" component={SignUpPW} />
            <Stack.Screen name="KakaoLogin" component={KakaoLogin} />
            <Stack.Screen name="NaverLogin" component={NaverLogin} />
          </>
        ) : (
          <>
            <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="JjimPage" component={JjimPage} />
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
