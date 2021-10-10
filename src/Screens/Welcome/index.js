import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView ,TouchableOpacity, StatusBar, ScrollView, Dimensions, TextInput  } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RFPercentage } from "react-native-responsive-fontsize";

const Welcome = ({navigation}) => {

  return (
    <View style={styles.container}>


        <Text style={styles.welcomeText}>환영합니다!</Text>
        <Text style={{color: '#797D7F', marginBottom: 15}}>유진님, 회원가입을 축하드립니다.</Text>
        <Text style={{color: '#797D7F'}}>회원님의 이메일은 </Text>
        <Text style={{color: '#797D7F'}}>youjinee98@naver.com 입니다</Text>
        <TouchableOpacity
          onPress={()=>{navigation.navigate('Home')}}
          style={styles.startBtn}>
          <Text style={styles.startText}>시작하기</Text>
        </TouchableOpacity>

    </View>
  )
}

export default Welcome;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  xIcon: {
    fontSize: RFPercentage(3.5),
  },
  welcomeContentsWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20, 

  },
  welcomeText: {
    fontSize: RFPercentage(4),
    fontWeight: 'bold',
    marginBottom: 30
  },
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

