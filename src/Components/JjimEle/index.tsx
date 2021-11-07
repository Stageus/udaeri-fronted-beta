import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native'

const { width, height } = Dimensions.get('window');

const SC = {
  JjimEleWrap: styled.View`
    width: ${width*0.35}px;
    height: ${width*0.35}px;
    background-color: #EBEDEF;
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
    width: ${width*0.1}px;
    height: ${width*0.1}px;
    background-color: #A9CCE3;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
  `,
  Bottom: styled.View`
    margin-left: 7px;
  `,
  CatTitle: styled.Text`
    font-size: 1.7px;
    color: #797D7F;
  `,
  ShopName: styled.Text`
    font-size: 2.2px;
    font-weight: bold;
  `
}

interface Props {
  icon: string;
  category: string;
  name: string;
}

const JjimEle = ({icon, category, name}: Props) => {

  return (
    <SC.JjimEleWrap>
      <SC.Top>
        <SC.IconWrap>
          {icon}
        </SC.IconWrap>
      </SC.Top>
      <SC.Bottom>
        <SC.CatTitle>{category}</SC.CatTitle>
        <SC.ShopName numberOfLines={1}>{name}</SC.ShopName>
      </SC.Bottom>
    </SC.JjimEleWrap>


  )
}

export default JjimEle;