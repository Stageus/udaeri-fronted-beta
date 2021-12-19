import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  StatusBar,
} from "react-native";
import {
  AntDesign,
  Ionicons,
  FontAwesome,
  Entypo,
  Fontisto,
  FontAwesome5,
} from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { restoreToken } from "../../../reducer/index";

const StatusBarHeight = StatusBar.currentHeight;

const SC = {
  Container: styled.View`
    background-color: #fff;
    padding: 0 20px;
    // height: 100%;

    ${Platform.OS === "android"
      ? css`
          padding-top: ${StatusBarHeight + 15}px;
        `
      : undefined}
  `,
  HeaderNoLogin: styled.View`
    padding: 0 20px;
    flex-direction: row;
    padding-bottom: 15px;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color: #797d7f;
  `,
  HeaderYesLogin: styled.View`
    // padding: 0 20px;
    flex-direction: row;
    padding-bottom: 15px;
    align-items: center;
    justify-content: space-between;
    border-bottom-width: 1px;
    border-bottom-color: #797d7f;
  `,
  NickNameWrap: styled.View`
    flex-direction: row;
    align-items: center;
  `,
  NickName: styled.Text`
    color: #ff9933;
    font-size: 24px;
    font-weight: bold;
    margin-right: 10px;
  `,
  MyPageList: styled.View`
    padding: 15px 5px 0 5px;
  `,
  MyPageListEle: styled.TouchableOpacity`
    margin-bottom: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
  `,
  MyPageListText: styled.Text`
    font-size: 16px;
  `,
};

const MyPage = ({ navigation }) => {
  const dispatch = useDispatch();

  const TOKEN_KEY = "@userKey";

  const logOut = () => {
    AsyncStorage.removeItem(TOKEN_KEY);
    dispatch(restoreToken());
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#FFFFFF",
        flex: 1,
      }}
    >
      <SC.Container>
        <SC.HeaderYesLogin>
          <SC.NickNameWrap>
            <SC.NickName>유진진</SC.NickName>
            <Text>
              <FontAwesome5
                name="crown"
                style={{ fontSize: RFPercentage(2.5), color: "#ffec00" }}
              />
            </Text>
          </SC.NickNameWrap>
          <TouchableOpacity onPress={() => {}}>
            <FontAwesome
              name="gear"
              style={{ fontSize: RFPercentage(2.5), color: "#797D7F" }}
            />
          </TouchableOpacity>
        </SC.HeaderYesLogin>

        <SC.MyPageList>
          <SC.MyPageListEle>
            <SC.MyPageListText>문의하기</SC.MyPageListText>
          </SC.MyPageListEle>
          <SC.MyPageListEle>
            <SC.MyPageListText>버전정보</SC.MyPageListText>
            <Text style={{ fontSize: RFPercentage(2.2), letterSpacing: 2 }}>
              v1.0.0
            </Text>
          </SC.MyPageListEle>
          <SC.MyPageListEle>
            <SC.MyPageListText onPress={() => logOut()}>
              로그아웃
            </SC.MyPageListText>
          </SC.MyPageListEle>
          <SC.MyPageListEle>
            <SC.MyPageListText>후원하기</SC.MyPageListText>
          </SC.MyPageListEle>
          <SC.MyPageListEle>
            <SC.MyPageListText
              onPress={() => {
                navigation.navigate("KakaoLogin");
              }}
            >
              카카오 로그인
            </SC.MyPageListText>
          </SC.MyPageListEle>
        </SC.MyPageList>
      </SC.Container>
    </SafeAreaView>
  );
};

export default MyPage;
