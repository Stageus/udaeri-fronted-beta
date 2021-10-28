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

interface Props {
  text: string;
}

const LongBarBtn = ({text}:Props) => {

  return (
    <LongBtn>
      <BtnText>
        {text}
      </BtnText>
    </LongBtn>
  )
}

export default LongBarBtn;