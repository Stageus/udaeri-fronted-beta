import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  StatusBar,
  TextInput,
  View,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled, { css } from "styled-components/native";
import axios from "axios";
import HeaderBar from "../../Components/HeaderBar";
import MyPageEle from "../../Components/MyPageEle";
import { restoreUserNickname, checkSponsor } from "../../../reducer/index";

const StatusBarHeight = StatusBar.currentHeight;

const SC = {
  Container: styled.View`
    background-color: #fff;

    ${Platform.OS === "android"
      ? css`
          padding-top: ${StatusBarHeight + 15}px;
        `
      : undefined}
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
};

const MyPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const mainColor = useSelector((state) => state.mainColor);
  const grayColor = useSelector((state) => state.grayColor);

  const [token, setToken] = useState();
  const [nickNameChange, setNickNameChange] = useState(false);
  const [onChangeNickname, setOnchangeNickname] = useState("");
  const [sponsor, setSponsor] = useState();

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
    let tokentoken;
    await AsyncStorage.getItem(TOKEN_KEY, (err, result) => {
      tokentoken = result;
      setToken(result);
    });

    axios
      .get("/users", {
        headers: {
          authorization: tokentoken,
        },
      })
      .then((res) => {
        res.data.success
          ? (dispatch(restoreUserNickname(res.data.nickname)),
            dispatch(checkSponsor(res.data.sponsor)),
            setOnchangeNickname(res.data.nickname),
            setSponsor(res.data.sponsor))
          : console.log("유저 데이터 가져오기 실패", res.data);
      })
      .catch((err) => console.log("회원 정보 못 받아옴", err));
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
            authorization: token,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          saveToken(res.data.token); // 토큰 asyncstorage에 저장
          dispatch(restoreUserNickname(name)); // 닉네임 리덕스에 저장
        } else {
          console.log("false: ", res.data);
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
              {sponsor === "Y" ? (
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
              style={{ fontSize: RFPercentage(2.5), color: grayColor }}
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
