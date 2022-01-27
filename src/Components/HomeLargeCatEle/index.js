import React from "react";
import { AntDesign } from "@expo/vector-icons";
import styled from "styled-components/native";

const CatEleWrap = styled.TouchableOpacity`
  height: 13%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const IconWrap = styled.View`
  background-color: #ff9933;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  margin-right: 15px;
`;
const CatTitle = styled.Text`
  color: black;
  font-size: 18px;
  width: 78%;
  font-family: Regular;
`;

const HomeLargeCatEle = (props) => {
  return (
    <CatEleWrap
      onPress={() => {
        props.navigation.navigate("MiddleCat", { key: props.title });
      }}
    >
      <IconWrap>{props.icon}</IconWrap>
      <CatTitle>{props.title}</CatTitle>
      <AntDesign name="right" size={15} color="black" />
    </CatEleWrap>
  );
};

export default HomeLargeCatEle;
