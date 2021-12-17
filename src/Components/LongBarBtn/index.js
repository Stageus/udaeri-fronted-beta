import React from "react";
import { Dimensions } from "react-native";
import styled, { css } from "styled-components/native";
import { StackNavigationProp } from "@react-navigation/stack";

const { width, height } = Dimensions.get("window");

const LongBtn = styled.TouchableOpacity`
  background-color: #ff9933;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  width: ${width * 0.85}px;
  height: 40px;
`;

const BtnText = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
`;

// interface Props {
//   text: string;
//   nextPage: string;
//   active: boolean;
//   navigation: any
// }
const LongBarBtn = (props) => {
  console.log(props.active);
  return (
    <LongBtn onPress={() => props.navigation.navigate(props.nextPage)}>
      <BtnText>{props.text}</BtnText>
    </LongBtn>
  );
};

export default LongBarBtn;
