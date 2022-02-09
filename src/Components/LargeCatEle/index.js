import React from "react";
import styled from "styled-components/native";
import { StyleSheet, View, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { restoreCurLargeCat, restoreCurMidCat } from "../../../reducer/index";
import { RFPercentage } from "react-native-responsive-fontsize";

const SC = {
  Container: styled.TouchableOpacity`
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    margin: 7.5px 0;
  `,
  left: styled.View`
    flex-direction: row;
    align-items: center;
  `,
  thumbnail: styled.View`
    background-color: ${(props) =>
      props.color === "main" ? props.mainColor : "#1876FB"};
    width: 32px;
    height: 32px;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    margin-right: 15px;
  `,
  catTitle: styled.Text`
    font-family: Regular;
    font-size: ${RFPercentage(2.3)};
    color: black;
  `,
};

const LargeCatEle = (props) => {
  const dispatch = useDispatch();
  const mainColor = useSelector((state) => state.mainColor);
  return (
    JSON.stringify(props.name) === JSON.stringify("술집") ?
    <SC.Container
      onPress={() => {
        props.navi.navigate("StoreList", { key: props.name });
        dispatch(restoreCurLargeCat(props.name));
        dispatch(restoreCurMidCat(props.name));
      }}
    >
    <SC.left>
        <SC.thumbnail color={props.color} mainColor={mainColor}>
          {props.icon}
        </SC.thumbnail>
        <SC.catTitle>{props.name}</SC.catTitle>
      </SC.left>
      <MaterialIcons name="arrow-forward-ios" size={12} color="gray" />
    </SC.Container>  
    :
    <SC.Container
      onPress={() => {
        props.navi.navigate(props.page, { key: props.name });
        dispatch(restoreCurLargeCat(props.name));
      }}
    >
      <SC.left>
        <SC.thumbnail color={props.color} mainColor={mainColor}>
          {props.icon}
        </SC.thumbnail>
        <SC.catTitle>{props.name}</SC.catTitle>
      </SC.left>
      <MaterialIcons name="arrow-forward-ios" size={12} color="gray" />
    </SC.Container>
  );
};

export default LargeCatEle;
