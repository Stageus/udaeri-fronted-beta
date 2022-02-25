import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  StatusBar,
  Modal,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled, { css } from "styled-components/native";

import HeaderBar from "../../Components/HeaderBar";
import MyPageEle from "../../Components/MyPageEle";
import NicknameModal from "../../Components/NicknameModal";
import { restoreUserNickname, checkSponsor } from "../../../reducer/index";

const StatusBarHeight = StatusBar.currentHeight;

const SC = {
  Container: styled.View`
    background-color: #fff;

    ${Platform.OS === "android" &&
    css`
      padding-top: ${StatusBarHeight + 15}px;
    `}
  `,
  Top: styled.View`
    flex-direction: row;
    padding: 0 20px;
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
    color: ${(props) => props.color};
    font-size: 20px;
    font-weight: bold;
    margin-right: 10px;
  `,
  MyPageList: styled.View`
    padding: 0 20px;
  `,
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
  TextInputNickname: styled.TextInput`
    border-radius: 10px;
    width: 90%;
    padding: 8px 30px 8px 15px;
    border-width: 1px;
    border-color: ${(props) => props.color};
    color: black;
    font-size: 15px;
  `,

  NicknameChangeInput: styled.KeyboardAvoidingView`
    z-index: 5;
    height: 80px;
    background-color: red;
    position: absolute;
    bottom: 0;
    width: 100%;
  `,
};

const MyPage = ({ navigation }) => {

  const mainColor = useSelector((state) => state.mainColor);
  const grayColor = useSelector((state) => state.grayColor);
  const sponsorCheck = useSelector((state) => state.sponsorCheck);
  const userNickname = useSelector((state) => state.userNickname);

  const [token, setToken] = useState();
  const [nickNameChange, setNickNameChange] = useState(false);
  const [onChangeNickname, setOnchangeNickname] = useState(userNickname);

  const listElement = [
    { title: "문의/버그리포트", page: "Inquiry" },
    { title: "개발정보", page: null },
    { title: "이용약관", page: null },
    { title: "후원하기", page: "Sponsor" },
    { title: "로그아웃", page: null },
  ];
  const TOKEN_KEY = "@userKey";

  useEffect(async () => {
    await AsyncStorage.getItem(TOKEN_KEY, (err, result) => {
      setToken(result);
    });
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#FFFFFF",
        flex: 1,
      }}
    >
      <SC.Container nickNameChange={nickNameChange}>
        <HeaderBar title="마이페이지" center="true"></HeaderBar>
        <SC.Top>
          <SC.NickNameWrap>
            <SC.NickName color={mainColor}>{onChangeNickname}</SC.NickName>
            {sponsorCheck === "Y" ? (
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
          <TouchableOpacity
            onPress={() => {
              setNickNameChange((v) => !v);
            }}
          >
            <FontAwesome
              name="gear"
              style={{ fontSize: RFPercentage(2.5), color: grayColor }}
            />
          </TouchableOpacity>
        </SC.Top>

        <SC.MyPageList>
          {listElement.map((item, index) => {
            return sponsorCheck === "Y" && item.title === "후원하기" ? null : (
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

      <NicknameModal
        modalVisible={nickNameChange}
        setModalVisible={setNickNameChange}
        setOnchangeNickname={setOnchangeNickname}
        token = {token}
      />
    </SafeAreaView>
  );
};

export default MyPage;
