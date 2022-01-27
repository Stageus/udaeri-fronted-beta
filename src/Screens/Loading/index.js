import React from "react";
import { SafeAreaView, Dimensions, Text } from "react-native";
import styled from "styled-components/native";
import SvgImg from './svgImg'

const { width, height } = Dimensions.get("window");

const SC = {
  container: styled.View`
    background-color: #ffffff;
    display: flex;
    height: ${height}px;
    align-items: center;
    justify-content: center;
  `
};

const Loading = () => {
  return (
    <SafeAreaView style={{
      backgroundColor: "#FFFFFF",
      flex: 1,
    }}>
      <SC.container>
        <SvgImg></SvgImg>
      </SC.container>
    </SafeAreaView>
  );
};

export default Loading;
