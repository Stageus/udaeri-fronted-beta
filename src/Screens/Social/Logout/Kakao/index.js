import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import styled, { css } from "styled-components/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { restoreToken } from "../../../../../reducer/index";
import KakaoLogin from "../../Login/Kakao";

const KakaoLogout = () => {
  const dispatch = useDispatch();
  const EXPIRE_URI =
    "https://kauth.kakao.com/oauth/logout?client_id=02be3f8588228d4a03f6f2b0c0cf2d7f&logout_redirect_uri=http://3.35.67.117:8000/kakao/logout";

  const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;
  const TOKEN_KEY = "@userKey";
  const TokenExpire = () => {
    AsyncStorage.removeItem(TOKEN_KEY);
    dispatch(restoreToken());
  };
  TokenExpire();

  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={["*"]}
        scalesPageToFit={false}
        style={{ marginTop: 30 }}
        source={{ uri: EXPIRE_URI }}
        injectedJavaScript={runFirst}
        // onMessage={(event) => {
        //   TokenExpire();
        //   console.log(event);
        // }}
      />
    </View>
  );
};

export default KakaoLogout;
