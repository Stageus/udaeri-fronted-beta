import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import styled, { css } from "styled-components/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { restoreToken } from "../../../../../reducer/index";

const NaverLogin = () => {
  const url = useSelector((state) => state.url);
  axios.defaults.baseURL = url;

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

  return (
    <View style={{ flex: 1 }}>
      <WebView
        style={{ marginTop: 30 }}
        source={{
          uri:
            "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=" +
            client_id +
            "&redirect_uri=" +
            callback_url +
            "&state=" +
            randomState,
        }}
      ></WebView>
    </View>
  );
};

export default NaverLogin;
