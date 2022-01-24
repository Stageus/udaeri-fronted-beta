import React from "react";
import { Dimensions } from "react-native";
import styled, { css } from "styled-components/native";
import { useSelector, useDispatch } from "react-redux";

const { width, height } = Dimensions.get("window");

const LongBarBtn = (props) => {
  const mainColor = useSelector((state) => state.mainColor);

  return (
    <SC.LongBtn
      color={mainColor}
      onPress={() => props.navigation.navigate(props.nextPage)}
    >
      <SC.BtnText>{props.text}</SC.BtnText>
    </SC.LongBtn>
  );
};

export default LongBarBtn;

const SC = {
  LongBtn: styled.TouchableOpacity`
    background-color: ${(props) => props.color};
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    width: ${width * 0.85}px;
    height: 40px;
  `,
  BtnText: styled.Text`
    font-size: 20px;
    color: #fff;
    font-weight: bold;
  `,
};
