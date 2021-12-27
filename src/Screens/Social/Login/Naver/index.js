import React, { useState, useEffect } from "react";
import { View, StatusBar, Platform } from "react-native";
import { WebView } from "react-native-webview";
import styled, { css } from "styled-components/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { restoreToken } from "../../../../../reducer/index";
const StatusBarHeight = StatusBar.currentHeight;
const SC = {
  Container: styled.View`
    ${Platform.OS === "android"
      ? css`
          padding-top: ${StatusBarHeight + 15}px;
        `
      : undefined};
  `,
};

const NaverLogin = () => {
  const dispatch = useDispatch();
  const url = useSelector((state) => state.url);
  axios.defaults.baseURL = url;

  const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;

  const client_id = "TtMZfjScaNLpNbVdlfRJ";
  const callback_url = "http://3.35.67.117:8000/naver/callback";
  const [randomState, setRandomState] = useState();

  useEffect(() => {
    const getState = () => {
      axios.get("/state/").then((res) => {
        setRandomState(res.data.state);
      });
    };

    getState();
  }, []);

  // access code를 substring해서 server에 post요청하는 함수 실행
  const LoginProgress = (data) => {
    const startStr = "code=";
    const endStr = "&state";
    let startIdx = data.indexOf(startStr);
    let endIdx = data.indexOf(endStr);
    if (startIdx != -1) {
      let access_code = data.substring(startIdx + startStr.length, endIdx);
      PostAccessCode(access_code);
    }
  };

  // asyncStorage에 token저장하는 함수
  const TOKEN_KEY = "@userKey";
  const saveToken = async (token) => {
    await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(token));
  };

  // server에 access code를 post하고 token받아서 asyncStorage랑 redux에 token저장
  const PostAccessCode = async (access_code) => {
    axios
      .post("/oauth/", {
        code: access_code,
        state: randomState,
        platform: "naver",
      })
      .then((res) => {
        console.log("access token post 성공");
        console.log(JSON.stringify(res.data));
        saveToken(res.data.token);
        dispatch(restoreToken(res.data.token));
      })
      .catch((err) => {
        console.log("server로 access code post 실패");
        console.log(err);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={["*"]}
        scalesPageToFit={false}
        style={{ marginTop: StatusBarHeight }}
        source={{
          uri:
            "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=" +
            client_id +
            "&redirect_uri=" +
            callback_url +
            "&state=" +
            randomState,
        }}
        injectedJavaScript={runFirst}
        javaScriptEnabled={true}
        onMessage={(event) => {
          LoginProgress(event.nativeEvent["url"]);
        }}
      ></WebView>
    </View>
  );
};

export default NaverLogin;
