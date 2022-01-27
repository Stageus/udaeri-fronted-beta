import React, { useState } from "react";
import { Dimensions, SafeAreaView } from "react-native";
import styled from "styled-components/native";
import SNSLoginBar from "../../Components/SNSLoginBtn/index";

const { width, height } = Dimensions.get("window");

const SC = {
  container: styled.View`
    height: ${height}px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: ${height * 0.1}px 0;
  `,
  logoContainer: styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  logoText: styled.Text`
    font-family: "Bold";
    font-size: 56px;
    color: #ff9933;
  `,
  subLogoText: styled.Text`
    font-family: "Regular";
    font-size: 32px;
    color: #ff9933;
  `,
  loginContainer: styled.View`
    display: flex;
    justify-content: space-around;
    align-items: center;
  `,
  barContainer: styled.View`
    margin: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: ${width * 0.6}px;
  `,
  bar: styled.View`
    background-color: #c0c0c0;
    height: 1px;
    width: ${width * 0.2};
  `,
  barText: styled.Text`
    color: #c0c0c0;
    font-family: "Regular";
    font-size: 14px;
    margin: 0 5px;
  `,
};
const Login = ({ navigation }: any) => {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <SafeAreaView style={{ backgroundColor: "#FFFFFF" }}>
      <SC.container>
        <SC.logoContainer>
          <SC.logoText>우대리</SC.logoText>
          <SC.subLogoText>우리들의 대학 거리</SC.subLogoText>
        </SC.logoContainer>
        <SC.loginContainer>
          <SNSLoginBar
            id={"kakao"}
            navigation={navigation}
            moveScreen={"KakaoLogin"}
          />
          <SNSLoginBar
            id={"naver"}
            navigation={navigation}
            moveScreen={"NaverLogin"}
          />
          {/* <SNSLoginBar id={"fb"} navigation={navigation} />
          <SC.barContainer>
            <SC.bar />
            <SC.barText>또는</SC.barText>
            <SC.bar />
          </SC.barContainer>
          <SNSLoginBar id={"nothing"} navigation={navigation} /> */}
        </SC.loginContainer>
      </SC.container>
    </SafeAreaView>
  );
};

export default Login;
