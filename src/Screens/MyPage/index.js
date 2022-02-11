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
import axios from "axios";
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
  const dispatch = useDispatch();
  const mainColor = useSelector((state) => state.mainColor);
  const grayColor = useSelector((state) => state.grayColor);
  const sponsorCheck = useSelector((state) => state.sponsorCheck);
  const userNickname = useSelector((state) => state.userNickname);

  const [token, setToken] = useState();
  const [nickNameChange, setNickNameChange] = useState(false);
  const [onChangeNickname, setOnchangeNickname] = useState(userNickname);
  const [sponsor, setSponsor] = useState(sponsorCheck);

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
          console.log(res.data.success);
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
      <SC.Container nickNameChange={nickNameChange}>
        <HeaderBar title="마이페이지" center="true"></HeaderBar>
        <SC.Top>
          {nickNameChange ? (
            <SC.TextInputNickname
              multiline={false}
              returnKeyType={"done"}
              //value={onChangeNickname}
              onChangeText={(val) => setOnchangeNickname(val)}
              onSubmitEditing={() => onSubmit()}
              maxLength={15}
              placeholder="닉네임을 입력하세요"
              color={mainColor}
            ></SC.TextInputNickname>
          ) : (
            <SC.NickNameWrap>
              <SC.NickName color={mainColor}>{onChangeNickname}</SC.NickName>
              {sponsor === "Y" && (
                <Text>
                  <FontAwesome5
                    name="crown"
                    style={{ fontSize: RFPercentage(2.5), color: "#ffec00" }}
                  />
                </Text>
              )}
            </SC.NickNameWrap>
          )}
          <TouchableOpacity
            onPress={() => {
              nickNameChange ? onSubmit() : setNickNameChange((v) => !v);
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

      <NicknameModal
        modalVisible={nickNameChange}
        setModalVisible={setNickNameChange}
        setOnchangeNickname={setOnchangeNickname}
      />
    </SafeAreaView>
  );
};

export default MyPage;
