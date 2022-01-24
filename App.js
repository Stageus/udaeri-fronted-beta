import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { store } from "./store/index";
import { Provider, useSelector, useDispatch } from "react-redux";
import { checkToken, restoreUserNickname, checkSponsor } from "./reducer/index";
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
import SearchResult from "./src/Screens/Search/SearchResult";
import RecentSearch from "./src/Screens/Search/RecentSearch";
import Map from "./src/Screens/Map";
import MapSearch from "./src/Screens/Map/Search/index";
import MapSearchResult from "./src/Screens/Map/SearchResult";
import MyPage from "./src/Screens/MyPage";
import KakaoLogin from "./src/Screens/Social/Login/Kakao/index";
import NaverLogin from "./src/Screens/Social/Login/Naver/index";
import JjimPage from "./src/Screens/Jjim/index";

import Inquiry from "./src/Screens/Inquiry";
import RandomMenu from "./src/Screens/RandomMenu";

const Stack = createStackNavigator();

const App = () => {
  const url = useSelector((state) => state.url);
  axios.defaults.baseURL = url;

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

  const TOKEN_KEY = "@userKey";
  const tokenCheck = useSelector((state) => state.tokenCheck);
  const nickname = useSelector((state) => state.userNickname);

  useEffect(async () => {
    preLoad();

    let token;
    await AsyncStorage.getItem(TOKEN_KEY, (err, result) => {
      token = result;
    });

    axios
      .get("/users", {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        res.data.success
          ? (console.log("회원정보: " + JSON.stringify(res.data)),
            dispatch(restoreUserNickname(res.data.nickname)),
            dispatch(checkSponsor(res.data.sponsor)),
            dispatch(checkToken(true)))
          : (checkToken(false),
            console.log("로그인 실패: " + res.data.message));
      })
      .catch((err) => console.log("회원정보 못 받아옴~" + err));
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
            <Stack.Screen name="SearchResult" component={SearchResult} />
            <Stack.Screen name="RecentSearch" component={RecentSearch} />
            <Stack.Screen name="JjimPage" component={JjimPage} />
            <Stack.Screen name="MiddleCat" component={MiddleCat} />
            <Stack.Screen name="StoreList" component={StoreList} />
            <Stack.Screen name="StorePage" component={StorePage} />
            <Stack.Screen name="Map" component={Map} />
            <Stack.Screen name="MapSearch" component={MapSearch} />
            <Stack.Screen name="MapSearchResult" component={MapSearchResult} />
            <Stack.Screen name="MyPage" component={MyPage} />
            <Stack.Screen name="Inquiry" component={Inquiry} />
            <Stack.Screen name="RandomMenu" component={RandomMenu} />
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
