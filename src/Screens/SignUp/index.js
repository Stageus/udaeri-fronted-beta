import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar, ScrollView, Dimensions, TextInput } from 'react-native';
import { AntDesign, Ionicons, FontAwesome, Entypo, Fontisto, Feather } from '@expo/vector-icons';
import { RFPercentage } from "react-native-responsive-fontsize";
import LongBarBtn from '../../Components/LongBarBtn/index.js';
import ShortBtn from '../../Components/ShortBtn/index.js';

const SignUp = ({ navigation }) => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const [email, setEmail] = useState('');
  const [eamilMsg, setEmailMsg] = useState('');
  const [password, setPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordCheckMsg, setPasswordCheckMsg] = useState('');


  useEffect(() => {
    if (password === passwordCheck) {
      setPasswordCheckMsg('일치합니다.')
    }
  }, [password, passwordCheck]);


  return (
    <View style={styles.container}>
      <View style={styles.signUpHeader}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack()
          }}>
          <AntDesign name="arrowleft" style={styles.goBackIcon} color="#797D7F" />
        </TouchableOpacity>
        <Text style={styles.signUpHeaderText}>
          회원가입
        </Text>
      </View>

      <View style={styles.signUpInputTextWrap}>
        <View style={styles.inputTextWrap}>
          <View style={styles.inputTextTitle}><Text>이메일</Text></View>
          <View style={styles.inputTextBox}>
            <TextInput placeholder="이메일을 입력하세요" style={styles.textInput}
              onChangeText={text => setEmail(text)} />
          </View>
          {/* <TouchableOpacity style={{backgroundColor:'#ff9933', borderRadius:30, alignItems:"center", justifyContent: 'center', marginLeft:10, paddingHorizontal:10, height: screenHeight*0.04}}>
            <Text style={{color:'#fff', }}>확인</Text>
          </TouchableOpacity> */}
          <ShortBtn
            text="확인"
            onPress={() => alert('아직 안 만듦~.~')}>
          </ShortBtn>
        </View>

        <View style={styles.inputTextWrap}>
          <View style={styles.inputTextTitle}><Text>닉네임</Text></View>
          <View style={styles.inputTextBox}><TextInput placeholder="닉네임을 입력하세요" style={styles.textInput} /></View>
        </View>

        <View style={styles.inputTextWrap}>
          <View style={styles.inputTextTitle}><Text>비밀번호</Text></View>
          <View style={styles.inputTextBox}>
            <TextInput placeholder="영문, 숫자포함 8자리 이상" secureTextEntry={true} style={styles.textInput}
              onChangeText={text => setPassword(text)} />
          </View>
        </View>

        <View style={styles.inputTextWrap}>
          <View style={styles.inputTextTitle}><Text>비밀번호 확인</Text></View>
          <View style={styles.inputTextBox}>
            <TextInput placeholder="비밀번호를 입력하세요" secureTextEntry={true} style={styles.textInput}
              onChangeText={text => setPasswordCheck(text)} />
          </View>
        </View>

        <View style={styles.phoneAthWrap}>
          <Text style={styles.inputTextTitle}>휴대폰 인증</Text>
          <View style={{ flexDirection: 'row', alignItems: "center", marginTop: 10, justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: "center" }}>
              <TextInput style={styles.phoneNumber} />
              <Text style={{ marginHorizontal: 10 }}>-</Text>
              <TextInput style={styles.phoneNumber} />
              <Text style={{ marginHorizontal: 10 }}>-</Text>
              <TextInput style={styles.phoneNumber} />
            </View>
            <ShortBtn
              text="인증"
              onPress={() => alert('아직 안 만듦~.~')}>
            </ShortBtn>
          </View>
        </View>

        <View style={styles.phoneAthWrap}>
          <Text style={styles.inputTextTitle}>인증번호 입력</Text>
          <View style={{ flexDirection: 'row', alignItems: "center", marginTop: 10, justifyContent: 'space-between' }}>
            <TextInput style={styles.phoneAthNumber} />
            <ShortBtn
              text="확인"
              onPress={() => alert('아직 안 만듦~.~')}>
            </ShortBtn>
          </View>
        </View>
      </View>

      <View style={styles.signUpcheckBoxWrap}>
        {/* <CheckBox
          value={toggleCheckBox}
          onValueChange={(newValue) => setToggleCheckBox(newValue)}
        /> */}

        {/* Login페이지에서 로그인하기 버튼이랑 스타일 똑같음~ */}
        <LongBarBtn
          text="가입하기"
          onPress={() => { navigation.navigate('Home') }}>
        </LongBarBtn>
        {/* <TouchableOpacity 
          onPress={()=>{
            navigation.navigate('Welcome');
          }}
          style={styles.loginBtn}>
          <Text style={styles.loginText}>
            가입하기
          </Text>
        </TouchableOpacity> */}
      </View>


    </View>
  )
}

export default SignUp;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 45,
  },
  signUpHeader: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#797D7F",
    justifyContent: 'center',
  },
  goBackIcon: {
    fontSize: RFPercentage(3.5),
    position: 'absolute',
    left: -Dimensions.get('window').width * 0.33,
  },
  signUpHeaderText: {
    color: "#ff9933",
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
  },
  signUpInputTextWrap: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#797D7F",
  },
  inputTextWrap: {
    flexDirection: 'row',
    marginBottom: 15,
    // height: Dimensions.get('window').height*0.04
  },
  inputTextTitle: {
    flex: 3,
    justifyContent: 'center'
  },
  inputTextBox: {
    flex: 7,
  },
  textInput: {
    height: Dimensions.get('window').height * 0.04,
    borderWidth: 1,
    paddingHorizontal: 7,
    borderColor: "#797D7F",
    borderRadius: 3
  },
  phoneAthWrap: {
    marginTop: 10
  },
  phoneNumber: {
    height: Dimensions.get('window').height * 0.04,
    borderWidth: 1,
    paddingHorizontal: 7,
    borderColor: "#797D7F",
    borderRadius: 3,
    width: Dimensions.get('window').width * 0.15,
  },
  phoneAthNumber: {
    height: Dimensions.get('window').height * 0.04,
    borderWidth: 1,
    paddingHorizontal: 7,
    borderColor: "#797D7F",
    borderRadius: 3,
  },
  signUpcheckBoxWrap: {
    paddingVertical: 15,
    paddingHorizontal: 20,
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
});