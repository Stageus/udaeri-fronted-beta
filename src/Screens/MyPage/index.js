import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  StatusBar,
  TextInput,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled, { css } from "styled-components/native";
import axios from "axios";
import HeaderBar from "../../Components/HeaderBar";
import MyPageEle from "../../Components/MyPageEle";
import { restoreUserNickname } from "../../../reducer/index";

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
    color: ${(props) => props.color};
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
  TextInputNickname: styled.TextInput`
    border-radius: 10px;
    width: 90%;
    padding: 8px 30px 8px 15px;
    border-width: 1px;
    border-color: ${(props) => props.color};
    color: black;
    font-size: 15px;
  `,
};

const MyPage = ({ navigation }) => {
  const dispatch = useDispatch();

  const url = useSelector((state) => state.url);
  const nickname = useSelector((state) => state.userNickname);
  const checkSponsor = useSelector((state) => state.sponsorCheck);
  const mainColor = useSelector((state) => state.mainColor);

  const [nickNameChange, setNickNameChange] = useState(false);
  const [onChangeNickname, setOnchangeNickname] = useState("");
  const [token, setToken] = useState();

  const TOKEN_KEY = "@userKey";

  const listElement = [
    { title: "문의하기", page: "Inquiry" },
    { title: "버전정보", page: null },
    { title: "후원하기", page: null },
    { title: "버그리포트", page: null },
    { title: "개발자정보", page: null },
    { title: "로그아웃", page: null },
  ];

  useEffect(async () => {
    setOnchangeNickname(nickname);
    await AsyncStorage.getItem(TOKEN_KEY, (err, result) => {
      setToken(result);
    });
  }, []);

  const saveToken = async (token) => {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  };

  const updateNickname = (name) => {
    axios
      .put(
        "/users",
        {
          nickname: name,
        },
        {
          headers: {
            authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkhWV2tvRlIyQXVuUFZyV0dTbHJkN1k4ZEdob1pBQTdoLUgtQWxXQ3NpaG8iLCJuaWNrbmFtZSI6IuyasOuMgOuMgOuMgOuMgOuMgOuMgOuMgOuMgCIsInNwb25zb3IiOiJOIiwicGxhdGZvcm0iOiJuYXZlciIsImlhdCI6MTY0MzAxOTMzMCwiZXhwIjoxNjQzMDQwOTMwLCJpc3MiOiJVRFIifQ.ZNUIN_gZzRQyRw1J-BejqwMxntp8xvBfihapBCXjoJs",
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          saveToken(res.data.token); // 토큰 asyncstorage에 저장
          dispatch(restoreUserNickname(name)); // 닉네임 리덕스에 저장
        } else {
          console.log("false: ", res.data.success);
        }
      })
      .catch((err) => {
        console.log("닉네임 수정 에러: ", err);
      });
  };

  const onSubmit = () => {
    setNickNameChange((v) => !v);
    updateNickname(onChangeNickname);
  };

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
          {nickNameChange ? (
            <SC.TextInputNickname
              multiline={false}
              returnKeyType={"done"}
              value={onChangeNickname}
              onChangeText={(val) => setOnchangeNickname(val)}
              onSubmitEditing={() => onSubmit()}
              maxLength={15}
              placeholder="닉네임을 입력하세요"
              color={mainColor}
            ></SC.TextInputNickname>
          ) : (
            <SC.NickNameWrap>
              <SC.NickName color={mainColor}>{onChangeNickname}</SC.NickName>
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
          )}

          <TouchableOpacity
            onPress={() => {
              setNickNameChange((v) => !v);
            }}
          >
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
