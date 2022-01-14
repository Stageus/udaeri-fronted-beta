import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import styled, { css } from "styled-components/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { checkToken } from "../../../../../reducer/index";

const KakaoLogin = () => {
  const dispatch = useDispatch();

  const url = useSelector((state) => state.url);
  axios.defaults.baseURL = url;

  const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;

  // access code를 substring해서 server에 post요청하는 함수 실행
  const LoginProgress = (data) => {
    const startStr = "code=";
    let startIdx = data.indexOf(startStr);
    if (startIdx != -1) {
      let access_code = data.substring(startIdx + startStr.length);
      PostAccessCode(access_code);
    }
  };

  // asyncStorage에 token저장하는 함수
  const TOKEN_KEY = "@userKey";
  const saveToken = async (token) => {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  };

  // server에 access code를 post하고 token받아서 asyncStorage랑 redux에 token저장
  const PostAccessCode = async (access_code) => {
    axios
      .post("/oauth/", {
        code: access_code,
        platform: "kakao",
      })
      .then((res) => {
        console.log("access token post 성공" + res.data.token);
        saveToken(res.data.token);
        dispatch(checkToken(true));
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
        style={{ marginTop: 30 }}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=02be3f8588228d4a03f6f2b0c0cf2d7f&redirect_uri=${url}/callback`,
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

export default KakaoLogin;
