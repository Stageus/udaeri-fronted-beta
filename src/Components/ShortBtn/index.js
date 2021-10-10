import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native'


const SC = {
  shortBtn: styled.TouchableOpacity`
    background-color: #ff9933;
    border-radius: 30px;
    align-items: center;
    justify-content: center;
    padding: 0 12px;
    height: 30px;
    
  `,
  btnText: styled.Text`
    font-size: 15px;
    color: #ffffff;
    // font-weight: bold;
  `,
};




const ShortBtn = (props) => {

  return (

    <SC.shortBtn
      onPress={props.onPress}>
      <SC.btnText>
        {props.text}
      </SC.btnText>
    </SC.shortBtn>

  )
}

export default ShortBtn;