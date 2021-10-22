import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView, Dimensions  } from 'react-native';
import {AntDesign, Ionicons ,FontAwesome,Entypo,Fontisto, FontAwesome5    } from '@expo/vector-icons';
import { RFPercentage } from "react-native-responsive-fontsize";

const MyPage = ({navigation}) => {

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <View style={styles.container}>

      {isLoggedIn
      ? (<View style={styles.myPageHeaderYesLogin}>
          <View style={styles.nickNameWrap}>
            <Text style={{color:"#ff9933", fontSize:RFPercentage(3), fontWeight:'bold', marginRight: 10}}>유진진</Text>
            <Text>
              <FontAwesome5 name="crown" style={styles.crownIcon}/>
            </Text>
          </View>
          <TouchableOpacity
            onPress={()=>{ navigation.navigate('MyInfoEdit')}}>
            <FontAwesome name="gear" style={styles.gearIcon} />
          </TouchableOpacity>
        </View>)
      : (<View style={styles.myPageHeaderNoLogin}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text style={{color:"#ff9933", fontSize:RFPercentage(3), fontWeight:'bold'}}>로그인</Text>
         </TouchableOpacity>
        <Text style={{color:"#797D7F", fontSize:RFPercentage(3), fontWeight:'bold'}}>이 필요합니다</Text>
        </View>)
      }
       
      <View style={styles.myPageList}>
        <TouchableOpacity style={styles.myPageListEle}>
          <Text style={styles.myPageListText}>문의하기</Text>
        </TouchableOpacity>
        <View style={styles.myPageListEle}>
          <Text style={styles.myPageListText}>버전정보</Text>
          <Text style={{fontSize: RFPercentage(2.2), letterSpacing:2}}>v1.0.0</Text>
        </View>
          {isLoggedIn
          ? (<>
            <TouchableOpacity style={styles.myPageListEle}
              onPress={() => setIsLoggedIn(false)}>
              <Text style={styles.myPageListText}>로그아웃</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.myPageListEle}>
              <Text style={styles.myPageListText}>후원하기</Text>
            </TouchableOpacity>
          </>)
          : (<></>) }
        
      </View>
    </View>
   
  )
}

export default MyPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 45,
  },
  myPageHeaderNoLogin: {
    paddingHorizontal: 20, 
    flexDirection: 'row',
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#797D7F",
    alignItems:'center'
  },
  myPageList: {
    paddingTop: 15,
    paddingHorizontal: 20,
    
  },
  myPageListEle: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  myPageListText: {
    fontSize: RFPercentage(2.2),
  },
  myPageHeaderYesLogin: {
    paddingHorizontal: 20, 
    flexDirection: 'row',
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#797D7F",
    alignItems:'center',
    justifyContent: 'space-between',
  },
  nickNameWrap: {
    flexDirection: 'row',
    alignItems:'center',
  },
  crownIcon: {
    fontSize:RFPercentage(2.5),
    color:"#ffec00"
  },
  gearIcon: {
    fontSize:RFPercentage(2.5),
    color: '#797D7F'
  }
});