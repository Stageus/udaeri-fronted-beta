import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar, ScrollView, Dimensions, TextInput } from 'react-native';
import { AntDesign, Ionicons, FontAwesome, Entypo, Fontisto, FontAwesome5 } from '@expo/vector-icons';
import { RFPercentage } from "react-native-responsive-fontsize";
import ShortBtn from '../../Components/ShortBtn';

const MyInfoEdit = ({ navigation }) => {

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

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
          내 정보 수정
        </Text>
        <TouchableOpacity>
          <Text style={styles.saveText}>
            저장
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.signUpInputTextWrap}>
        <View style={styles.inputTextWrap}>
          <View style={styles.inputTextTitle}><Text>이메일</Text></View>
          <View style={styles.inputTextBox}><TextInput placeholder="이메일을 입력하세요" style={styles.textInput} /></View>
        </View>

        <View style={styles.inputTextWrap}>
          <View style={styles.inputTextTitle}><Text>닉네임</Text></View>
          <View style={styles.inputTextBox}><TextInput placeholder="닉네임을 입력하세요" style={styles.textInput} /></View>
        </View>

        <View style={styles.inputTextWrap}>
          <View style={styles.inputTextTitle}><Text>비밀번호</Text></View>
          <View style={styles.inputTextBox}><TextInput placeholder="비밀번호를 입력하세요" style={styles.textInput} /></View>
        </View>

        <View style={styles.inputTextWrap}>
          <View style={styles.inputTextTitle}><Text>비밀번호 확인</Text></View>
          <View style={styles.inputTextBox}><TextInput placeholder="비밀번호를 입력하세요" style={styles.textInput} /></View>
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


    </View>
  )
}

export default MyInfoEdit;


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
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  goBackIcon: {
    fontSize: RFPercentage(3.5),
  },
  signUpHeaderText: {
    color: "#ff9933",
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
  },
  saveText: {
    color: "#797D7F",
    fontSize: RFPercentage(2),
  },
  signUpInputTextWrap: {
    paddingVertical: 20,
    paddingHorizontal: 20,
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

});