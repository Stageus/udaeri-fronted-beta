import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native'

const { width, height } = Dimensions.get('window');

const LongBtn = styled.TouchableOpacity`
  background-color: #ff9933;
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  width : ${width * 0.8}px;
  height : 40px;
`

const BtnText = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
`

interface Props {
  text: string;
  navigation: any;
  nextPage: string;
}

const LongBarBtn = ({ text, nextPage, navigation }: Props) => {

  return (
    <LongBtn>
      <BtnText onPress={() => {
        navigation.navigate(nextPage);
      }}>
        {text}
      </BtnText>
    </LongBtn>
  )
}

export default LongBarBtn;