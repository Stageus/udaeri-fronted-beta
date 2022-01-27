import React from "react";
import { SafeAreaView, Dimensions, Text } from "react-native";
import styled from "styled-components/native";

const { width, height } = Dimensions.get("window");

const SC = {
  container: styled.View`
    background-color: #ffffff;
    display: flex;
    height: ${height}px;
    align-items: center;
    justify-content: center;
  `,
  logo: styled.View`
    width: 100px;
    height: 100px;
    background-color: #ff9933;
    border-radius: 50px;
    margin-bottom: 25px;
  `,
  textContainer: styled.View`
    display: flex;
    align-items: center;
  `,
  mainText: styled.Text`
    font-family: "Bold";
    font-size: 24px;
    color: #ff9933;
  `,
  subText: styled.Text`
    font-family: "Regular";
    font-size: 20px;
    color: #ff9933;
  `,
};

const Loading = () => {
  return (
    <SafeAreaView>
      <SC.container>
        <SC.logo></SC.logo>
        <SC.textContainer>
          <SC.mainText>우대리</SC.mainText>
          <SC.subText>우리들의 대학거리</SC.subText>
        </SC.textContainer>
      </SC.container>
    </SafeAreaView>
  );
};

export default Loading;
