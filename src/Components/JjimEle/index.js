import React from 'react';
import styled from 'styled-components/native'

const JjimEleWrap = styled.View`
  width: 30px;
  height: 30px;
  background-color: #EBEDEF;
  margin-right: 15px;
  border-radius: 20px;
  padding: 10px;
`

const Top = styled.View`
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  flex-direction: row;
`

const IconWrap = styled.View`
  width: 9px;
  height: 9px;
  background-color: #A9CCE3;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
`

const Bottom = styled.View`
  margin-left: 7px;
`

const CatTitle = styled.Text`
  font-size: 1.7px;
  color: #797D7F;
`

const ShopName = styled.Text`
  font-size: 2.2px;
  font-weight: bold;
`

const JjimEle = (props) => {

  return (
    <JjimEleWrap>
      <Top>
        <IconWrap>
          {props.icon}
        </IconWrap>
      </Top>
      <Bottom>
        <CatTitle>{props.category}</CatTitle>
        <ShopName numberOfLines={1}>{props.name}</ShopName>
      </Bottom>


    </JjimEleWrap>


  )
}

export default JjimEle;