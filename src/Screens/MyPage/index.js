import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { restoreToken, checkToken } from "../../../reducer/index";
import HeaderBar from "../../Components/HeaderBar";
import { MaterialIcons } from "@expo/vector-icons";
import MyPageEle from "../../Components/MyPageEle";

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
  HeaderBar: styled.View``,
  Top: styled.View`
    flex-direction: row;
    padding-bottom: 12px;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
  `,
  NickNameWrap: styled.View`
    flex-direction: row;
    align-items: center;
  `,
  NickName: styled.Text`
    color: #ff9933;
    font-size: 20px;
    font-weight: bold;
    margin-right: 10px;
  `,
  MyPageList: styled.View``,
  MyPageListWrap: styled.View`
    border-bottom-width: 1px;
    border-color: #d3d3d3;
  `,
  MyPageListEle: styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `,
  MyPageListText: styled.Text`
    font-size: 16px;
  `,
};

const MyPage = ({ navigation }) => {
  const dispatch = useDispatch();

  // const TOKEN_KEY = "@userKey";
  // const tokenExpire = () => {
  //   AsyncStorage.removeItem(TOKEN_KEY);
  //   dispatch(checkToken(false));
  // };

  const nickname = useSelector((state) => state.userNickname);
  const checkSponsor = useSelector((state) => state.sponsorCheck);

  const listElement = [
    { title: "문의하기", page: "Inquiry" },
    { title: "버전정보", page: null },
    { title: "후원하기", page: null },
    { title: "버그리포트", page: null },
    { title: "개발자정보", page: null },
    { title: "로그아웃", page: null },
  ];
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#FFFFFF",
        flex: 1,
      }}
    >
      <SC.Container>
        <HeaderBar title="마이페이지" center="true"></HeaderBar>
        <SC.Top>
          <SC.NickNameWrap>
            <SC.NickName>{nickname}</SC.NickName>
            {checkSponsor === "Y" ? (
              <Text>
                <FontAwesome5
                  name="crown"
                  style={{ fontSize: RFPercentage(2.5), color: "#ffec00" }}
                />
              </Text>
            ) : (
              <></>
            )}
          </SC.NickNameWrap>
          <TouchableOpacity onPress={() => {}}>
            <FontAwesome
              name="gear"
              style={{ fontSize: RFPercentage(2.5), color: "#797D7F" }}
            />
          </TouchableOpacity>
        </SC.Top>

        <SC.MyPageList>
          {listElement.map((item, index) => {
            return (
              <MyPageEle
                key={index}
                title={item.title}
                page={item.page}
                navigation={navigation}
              ></MyPageEle>
            );
          })}
        </SC.MyPageList>
      </SC.Container>
    </SafeAreaView>
  );
};

export default MyPage;
