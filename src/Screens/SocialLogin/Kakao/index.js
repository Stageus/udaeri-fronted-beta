import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import styled, { css } from "styled-components/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { restoreToken } from "../../../../reducer/index";

const KakaoLogin = ({ navigation }) => {
  const url = useSelector((state) => state.url);
  axios.defaults.baseURL = url;

  const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;

  console.log("카카오 로그인 1");

  // access code를 substring해서 server에 post요청하는 함수 실행
  const LoginProgress = (data) => {
    const exp = "code=";
    let condition = data.indexOf(exp);
    console.log("카카오 로그인 2");
    if (condition != -1) {
      let request_code = data.substring(condition + exp.length);
      console.log("access code: " + request_code);
      PostAccessCode(request_code);
    }
  };

  const TOKEN_KEY = "@userKey";
  const dispatch = useDispatch();

  const saveToken = async (token) => {
    await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(token));
  };

  // server에 access code post하고 token받아서 asyncStorage랑 redux에 token저장
  const PostAccessCode = async (request_code) => {
    axios
      .post("/oauth/", {
        code: request_code,
        platform: "kakao",
      })
      .then((res) => {
        console.log("access token post 성공");
        console.log(res.data);
        saveToken(res.data);
        dispatch(restoreToken(res.data));
        console.log("로그인 성공");
      })
      .catch((err) => {
        console.log("server로 access code post 실패");
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={["*"]}
        scalesPageToFit={false}
        style={{ marginTop: 30 }}
        source={{
          uri: "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=02be3f8588228d4a03f6f2b0c0cf2d7f&redirect_uri=http://3.35.67.117:8000/callback",
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
