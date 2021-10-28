import React from 'react';
import {Text, View, TouchableOpacity } from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";
import styled from 'styled-components/native';

const SC = {
  Wrap: styled.TouchableOpacity`
    margin-bottom: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
  `,
  Text: styled.Text`
    font-size: 16px;
  `
}

const MyPageEle = (props) => {

  return (
    <SC.Wrap>
      <SC.Text>{props.title}</SC.Text>
      {props.version !== undefined
      ? (<Text style={{fontSize: RFPercentage(2.2), letterSpacing:2}}>{props.version}</Text>)
      : (<></>)
      }
    </SC.Wrap>
  )
}

export default MyPageEle;