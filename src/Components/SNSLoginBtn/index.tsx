import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Dimensions, Image } from "react-native";
import styled, { css } from "styled-components/native";

const { width, height } = Dimensions.get("window");

const logoData = {
  kakao: {
    color: "#FEE500",
    src: require("../../../assets/logo/kakaologo.png"),
    text: "카카오로 시작하기",
  },
  naver: {
    color: "#03C75A",
    src: require("../../../assets/logo/naverlogo.png"),
    text: "네이버로 시작하기",
  },
  fb: {
    color: "#4864AF",
    src: require("../../../assets/logo/fblogo.png"),
    text: "페이스북로 시작하기",
  },
  nothing: {
    color: "#ff9933",
    text: "우대리 로그인",
  },
};

interface Props {
  navigation: any;
  id: "nothing" | "kakao" | "naver" | "fb";
  moveScreen: string;
}

const SNSLoginBtn = ({ navigation, id, moveScreen }: Props) => {
  return id != "nothing" ? (
    <SC.container color={logoData[id].color}
    onPress = {() => {
      navigation.navigate(moveScreen);
    }}>
      <SC.logo source={logoData[id].src} />
      <SC.text id={id}>{logoData[id].text}</SC.text>
    </SC.container>
  ) : (
    <SC.container
      color={logoData[id].color}
      onPress={() => {
        // navigation.navigate({ routes: [{ name: "EmailLogin" }] });
        navigation.navigate("EmailLogin");
      }}
    >
      <SC.text id={id}>{logoData[id].text}</SC.text>
    </SC.container>
  );
};

const SC = {
  container: styled.TouchableOpacity`
    background-color: ${(props) => props.color};
    width: ${width * 0.6}px;
    height: 50px;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    margin: 5px;
  `,
  text: styled.Text`
    font-family: "Medium";
    color: ${(props) => (props.id === "kakao" ? css`#000000` : css`#ffffff`)};
  `,
  logo: styled.Image`
    width: 25px;
    height: 25px;
  `,
};
export default SNSLoginBtn;
