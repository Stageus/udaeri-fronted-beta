import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native'

const { width, height } = Dimensions.get('window');

const LongBtn = styled.TouchableOpacity`
  background-color: #ff9933;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  height: ${height*0.05};
  width: 100%;
`

const BtnText = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
`


const LongBarBtn = (props) => {

  return (
    <LongBtn
      onPress={props.onPress}>
      <BtnText>
        {props.text}
      </BtnText>
    </LongBtn>
  )
}

export default LongBarBtn;