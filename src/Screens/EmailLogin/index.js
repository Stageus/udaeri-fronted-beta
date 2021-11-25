import React, { useState } from 'react';
import { Dimensions, SafeAreaView, Alert, Keyboard } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import Xbtn from '../../Components/Xbtn';
import InputText from '../../Components/InputText';


const { width, height } = Dimensions.get("window");

const SC = {
  container: styled.View`
    height: ${height}px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  `,
  loginContainer: styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  loginBtn: styled.TouchableOpacity`
    width: ${width * 0.7}px;
    height: 40px;
    background-color: #ff9933;
    border-radius: 5px;
    margin: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  loginBtnText: styled.Text`
    font-family: "Medium";
    font-size: 16px;
    color: #ffffff;
  `,
  bottomContainer: styled.View`
    display: flex;
    flex-direction: row;
    width: ${width * 0.6}px;
    justify-content: space-around;
  `,
  findText: styled.Text`
    color: #808080;
    font-size: 12px;
    font-family: "Medium";
  `,
  signupText: styled.Text`
    color: #ff9933;
    font-size: 12px;
    font-family: "Medium";
  `,
};
const EmailLogin = ({ navigation }) => {

  const [IDValue, setIDValue] = useState("");
  const [PWValue, setPWValue] = useState("");

  const login = () => {
    axios.post('http://3.12.241.33:8000/auth/login', {
      id: IDValue,
      password: PWValue,
    })
      .then(function (response) {
        console.log(response)
        response.data.success ?
          navigation.reset({ routes: [{ name: 'Home', params: response.data.token }] })
          :
          Alert.alert(
            "아이디 또는 비밀번호가 틀립니다!",
            "다시 입력해주세요.",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#ffffff" }}>
      <SC.container>
        <SC.loginContainer>
          <Xbtn nextPage="Login" navigation={navigation}></Xbtn>
          <InputText placeHolder='아이디 또는 이메일' type='id' value={IDValue} getValue={setIDValue}></InputText>
          <InputText placeHolder='비밀번호' type='pw' value={PWValue} getValue={setPWValue}></InputText>
          <SC.loginBtn onPress={() => {
            login()
          }}>
            <SC.loginBtnText>로그인</SC.loginBtnText>
          </SC.loginBtn>
        </SC.loginContainer>
        <SC.bottomContainer>
          <SC.findText>아이디 찾기</SC.findText>
          <SC.findText> | </SC.findText>
          <SC.findText>비밀번호 찾기</SC.findText>
          <SC.findText> | </SC.findText>
          <SC.signupText
            onPress={() => {
              navigation.navigate("SignUpID");
            }}
          >
            회원가입
          </SC.signupText>
        </SC.bottomContainer>
      </SC.container>

    </SafeAreaView>
  );
};
export default EmailLogin;
