import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native'

const { width, height } = Dimensions.get('window');

const SC = {
  JjimEleWrap: styled.View`
    width: ${width*0.35};
    height: ${width*0.35};
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
    width: ${width*0.1};
    height: ${width*0.1};
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

const JjimEle = (props) => {

  return (
    <SC.JjimEleWrap>
      <SC.Top>
        <SC.IconWrap>
          {props.icon}
        </SC.IconWrap>
      </SC.Top>
      <SC.Bottom>
        <SC.CatTitle>{props.category}</SC.CatTitle>
        <SC.ShopName numberOfLines={1}>{props.name}</SC.ShopName>
      </SC.Bottom>


    </SC.JjimEleWrap>


  )
}

export default JjimEle;