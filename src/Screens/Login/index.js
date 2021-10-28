import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar, ScrollView, Dimensions, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RFPercentage } from "react-native-responsive-fontsize";
import LongBarBtn from '../../Components/LongBarBtn/index'

// const HomePageMove = ({navigation}) => {
//   navigation.navigate('Home')
// }


const Login = ({ navigation }) => {

  return (

    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack()
        }}>
        <Feather name="x" style={styles.xIcon} />
      </TouchableOpacity>

      {/* 로그인 */}
      <View style={styles.loginWrap}>
        <TextInput
          style={styles.textInput}
          placeholder="이메일"
        />
        <TextInput
          style={styles.textInputPwd}
          placeholder="비밀번호"
        />
        <LongBarBtn
          text="로그인"
          onPress={() => { navigation.navigate('Home') }}>
        </LongBarBtn>
        {/* <TouchableOpacity 
            onPress={()=> {
              navigation.navigate('Home')
            }}
            style={styles.loginBtn}>
            <Text style={styles.loginText}>
              로그인
            </Text>
          </TouchableOpacity> */}
        <View style={styles.findWrap}>
          <TouchableOpacity style={{ marginRight: 20, }}>
            <Text style={styles.findBtn}>
              이메일 찾기
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.findBtn}>
              비밀번호 찾기
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 회원가입 */}
      <View style={styles.signUpWrap}>
        <Text style={{ fontSize: RFPercentage(1.7), color: '#797D7F', marginRight: 20 }}>
          우대리가 처음이시라면?
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SignUp');
          }}>
          <Text style={{ fontSize: RFPercentage(1.7), color: '#ff9933', fontWeight: 'bold' }}>
            회원가입
          </Text>
        </TouchableOpacity>
      </View>
    </View>

  )
}

export default Login;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingHorizontal: 20
  },
  xIcon: {
    fontSize: RFPercentage(3.5),
  },
  loginWrap: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    flex: 10,
  },
  textInput: {
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    borderColor: '#797D7F',
    height: Dimensions.get('window').height * 0.06
  },
  textInputPwd: {
    marginTop: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#797D7F',
    height: Dimensions.get('window').height * 0.06
  },

  loginBtn: {
    backgroundColor: '#ff9933',
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center',
    height: Dimensions.get('window').height * 0.06,
    marginVertical: 20
  },
  loginText: {
    fontSize: RFPercentage(2.4),
    color: '#fff',
    fontWeight: 'bold'
  },
  findWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  findBtn: {
    fontSize: RFPercentage(1.7),
    color: '#797D7F'
  },
  signUpWrap: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }


});