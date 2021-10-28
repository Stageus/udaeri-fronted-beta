import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons, FontAwesome, Entypo, Fontisto, FontAwesome5 } from '@expo/vector-icons';
import { RFPercentage } from "react-native-responsive-fontsize";
import styled from 'styled-components/native';
import MyPageEle from '../../Components/MyPageEle';


const SC = {
  Container: styled.View`
    flex: 1;
    // height: 100%;
    background-Color: #fff;
    padding-top: 45px;
  `,
  HeaderNoLogin: styled.View`
    padding: 0 20px;
    flex-direction: row;
    padding-bottom: 15px;
    align-Items: center;
    border-bottom-width : 1px;
    border-bottom-color: #797D7F;
  `,
  HeaderYseLogin: styled.View`
    padding: 0 20px;
    flex-direction: row;
    padding-bottom: 15px;
    align-Items: center;
    justify-content: space-between;
    border-bottom-width : 1px;
    border-bottom-color: #797D7F;
  `,
  NickNameWrap: styled.View`
    flex-direction: row;
    align-items: center;
  `,
  NickName: styled.Text`
    color: #ff9933;
    font-size: 24px;
    font-weight: bold;
    margin-right: 10px; 
  `,
  MyPageList: styled.View`
    padding: 15px 20px 0 20px;
  `,
  // MyPageListEle: styled.TouchableOpacity`
  //   margin-bottom: 10px;
  //   flex-direction: row;
  //   align-items: center;
  //   justify-content: space-between;
  //   padding: 5px 0;
  // `,
  // MyPageListText: styled.Text`
  //   font-size: 16px;
  // `
}

const MyPage = ({ navigation }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // const myPageList = [
  //   {title: "문의하기"},
  //   {title: "버전정보"},
  //   {title: "로그아웃"},
  //   {title: "후원하기"},
  // ]

  return (
    <SC.Container>
      {isLoggedIn
        ? (<SC.HeaderYseLogin>
          <SC.NickNameWrap>
            <SC.NickName>유진진</SC.NickName>
            <Text>
              <FontAwesome5 name="crown" style={{ fontSize: RFPercentage(2.5), color: "#ffec00" }} />
            </Text>
          </SC.NickNameWrap>
          <TouchableOpacity
            onPress={() => { }}>
            <FontAwesome name="gear" style={{ fontSize: RFPercentage(2.5), color: '#797D7F' }} />
          </TouchableOpacity>
        </SC.HeaderYseLogin>)
        : (<SC.HeaderNoLogin>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={{ color: "#ff9933", fontSize: RFPercentage(3), fontWeight: 'bold' }}>로그인</Text>
          </TouchableOpacity>
          <Text style={{ color: "#797D7F", fontSize: RFPercentage(3), fontWeight: 'bold' }}>이 필요합니다</Text>
        </SC.HeaderNoLogin>)
      }

      <SC.MyPageList>
        <SC.MyPageListEle>
          <SC.MyPageListText>문의하기</SC.MyPageListText>
        </SC.MyPageListEle>
        <SC.MyPageListEle>
          <SC.MyPageListText>버전정보</SC.MyPageListText>
          <Text style={{ fontSize: RFPercentage(2.2), letterSpacing: 2 }}>v1.0.0</Text>
        </SC.MyPageListEle>
        {isLoggedIn
          ? (<>
            <SC.MyPageListEle
              onPress={() => setIsLoggedIn(false)}>
              <SC.MyPageListText>로그아웃</SC.MyPageListText>
            </SC.MyPageListEle>
            <SC.MyPageListEle>
              <SC.MyPageListText>후원하기</SC.MyPageListText>
            </SC.MyPageListEle>
          </>)
          : (<></>)}

      </SC.MyPageList>
    </SC.Container>

  )
}

export default MyPage;
