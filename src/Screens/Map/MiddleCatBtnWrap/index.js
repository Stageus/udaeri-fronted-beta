import React, { useState } from "react";
import { ScrollView, StatusBar, Dimensions } from "react-native";
import MiddleCatBtn from "../MiddleCatBtn/index";
import styled, { css } from "styled-components/native";

const StatusBarHeight = StatusBar.currentHeight;
const { width, height } = Dimensions.get("window");

const SC = {
  Container: styled.ScrollView`
    position: absolute;
    top: ${StatusBarHeight + height * 0.03}px;
    z-index: 5;
  `,
};

const MiddleCatBtnWrap = (props) => {
  const category = props.cat;
  return (
    <SC.Container horizontal showsHorizontalScrollIndicator={false}>
      {category.map((item, index) => {
        return <MiddleCatBtn key={index} name={item}></MiddleCatBtn>;
      })}
    </SC.Container>
  );
};

export default MiddleCatBtnWrap;
