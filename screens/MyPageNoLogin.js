import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView, Dimensions  } from 'react-native';
import {AntDesign, Ionicons ,FontAwesome,Entypo,Fontisto   } from '@expo/vector-icons';
import { RFPercentage } from "react-native-responsive-fontsize";

const MyPageNoLogin = ({navigation}) => {

  return (
    <View style={styles.container}>
       <View style={styles.myPageHeader}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}
        >
          <Text style={{color:"#ff9933", fontSize:RFPercentage(3), fontWeight:'bold'}}>로그인</Text>
         </TouchableOpacity>
        <Text style={{color:"#797D7F", fontSize:RFPercentage(3), fontWeight:'bold'}}>이 필요합니다</Text>
      </View>
      <View style={styles.myPageList}>
        <Text style={styles.myPageListEle}>문의하기</Text>
        <View style={styles.myPageListEle}>
          <Text style={{fontSize: RFPercentage(2.2), }}>버전정보</Text>
          <Text style={{fontSize: RFPercentage(2.2), letterSpacing:2, }}>v1.0.0</Text>
        </View>
      </View>
    </View>
   
  )
}

export default MyPageNoLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 45,
  },
  myPageHeader: {
    paddingHorizontal: 20, 
    flexDirection: 'row',
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#797D7F",
  },
  myPageList: {
    paddingTop: 15,
    paddingHorizontal: 20,
    
  },
  myPageListEle: {
    flexDirection: 'row',
    alignItems:"center",
    marginBottom: 15,
    justifyContent: 'space-between',
    fontSize: RFPercentage(2.2),
    },
});