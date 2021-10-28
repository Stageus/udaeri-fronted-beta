import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView ,TouchableOpacity, StatusBar, ScrollView, Dimensions, TextInput  } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RFPercentage } from "react-native-responsive-fontsize";
import styled from 'styled-components/native';

import LongBarBtn from '../../Components/LongBarBtn/index';

const SC = {
  Container: styled.View`
    flex: 1;
    background-color: #fff;
    padding-top: 30px;
    padding: 0 20px;
    justify-content: center;
    align-items: center;
  `,
  WelcomeText: styled.Text`
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 30px;
  `
}


const Welcome = ({navigation}) => {

  return (
    <SC.Container>
        <SC.WelcomeText>환영합니다!</SC.WelcomeText>
        <Text style={{color: '#797D7F', marginBottom: 15}}>유진님, 회원가입을 축하드립니다.</Text>
        <Text style={{color: '#797D7F'}}>회원님의 이메일은 </Text>
        <Text style={{color: '#797D7F'}}>youjinee98@naver.com 입니다</Text>
        <LongBarBtn
          text="시작하기"
          onPress={()=>{navigation.navigate('Home')}}>
        </LongBarBtn>
    </SC.Container>
  )
}

export default Welcome;


const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   paddingTop: 30,
  //   paddingHorizontal: 20,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // welcomeText: {
  //   fontSize: RFPercentage(4),
  //   fontWeight: 'bold',
  //   marginBottom: 30
  // },
  startBtn: {
    backgroundColor: '#ff9933', 
    borderRadius:5, 
    alignItems:"center", 
    justifyContent: 'center', 
    height: Dimensions.get('window').height*0.06,
    width: '100%',
    marginTop: 20
  },
  startText: {
    fontSize: RFPercentage(2.4), 
    color: '#fff', 
    fontWeight:'bold'
  },
 
})

