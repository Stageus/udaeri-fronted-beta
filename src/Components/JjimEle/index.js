import React from "react";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { useSelector, useDispatch } from "react-redux";
import {
  restoreCurStore,
  restoreCurLargeCat,
  restoreCurMidCat,
} from "../../../reducer/index";

const { width, height } = Dimensions.get("window");

const SC = {
  JjimEleWrap: styled.TouchableOpacity`
    width: ${width * 0.35}px;
    height: ${width * 0.35}px;
    background-color: #ebedef;
    margin-right: 15px;
    border-radius: 20px;
    padding: 10px;
  `,
  Top: styled.View`
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    flex-direction: row;
  `,
  IconWrap: styled.View`
    width: ${width * 0.1}px;
    height: ${width * 0.1}px;
    background-color: #a9cce3;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
  `,
  Bottom: styled.View`
    margin-left: 7px;
  `,
  CatTitle: styled.Text`
    font-size: 14px;
    color: #797d7f;
  `,
  ShopName: styled.Text`
    font-size: 12px;
    font-weight: bold;
  `,
};

// interface Props {
//   icon: string;
//   category: string;
//   name: string;
//   navigation: any;
// }

const JjimEle = (props) => {
  const dispatch = useDispatch();

  return (
    <SC.JjimEleWrap
      activeOpacity={0.8}
      onPress={() => {
        console.log("힁");
        props.navigation.navigate("StorePage", { key: props.name });
        dispatch(restoreCurStore(props.name));
      }}
    >
      <SC.Top>
        <SC.IconWrap>{props.icon}</SC.IconWrap>
      </SC.Top>
      <SC.Bottom>
        <SC.CatTitle>{props.l_category}</SC.CatTitle>
        <SC.ShopName numberOfLines={1}>{props.name}</SC.ShopName>
      </SC.Bottom>
    </SC.JjimEleWrap>
  );
};

export default JjimEle;
