import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
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
//   page: string;
// }

const LongBarBtn = (props) => {
  return (
    <LongBtn onPress={() => props.navi.navigate(props.page)}>
      <BtnText>{props.text}</BtnText>
    </LongBtn>
  );
};

export default LongBarBtn;
