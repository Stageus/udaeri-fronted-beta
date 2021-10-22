import React, {useState, useEffect} from 'react';
// import 'react-native-gesture-handler';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView, Dimensions  } from 'react-native';
import {AntDesign, Ionicons ,FontAwesome,Entypo,Fontisto   } from '@expo/vector-icons';
import { RFPercentage } from "react-native-responsive-fontsize";
import styled from 'styled-components/native';
import LongBarBtn from '../../Components/LongBarBtn';
import HomeLargeCatEle from '../../Components/HomeLargeCatEle';
import JjimEle from '../../Components/JjimEle';

const SC = {
  Container: styled.View`
    background-color: #fff;
    padding: 0 20px;
    padding-Top: 45px;
    height: 100%;
  `,
  Top: styled.View`
    height: 5%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,
  MainTitle: styled.Text`
    font-size: 20px;
    font-family: Bold;
  `,
  SchoolTitle: styled.Text`
    font-size: 20px;
    font-family: Bold;
    color: #ff9933;
  `,
  Middle: styled.View`
    height: 65%;
    padding-top: 10px;
    margin-bottom: 15px;
    // background-color: yellow;
    justify-content: space-between;
  `,
  CategoryWrap: styled.View`
    height: 85%;
    justify-content: space-between;
  `,
  Bottom: styled.View`
    height: 25%;
  `,
  JjimWrapNoLogin: styled.View`
    background-color: #EBEDEF;
    height: 75%;
    border-radius: 10px;
    margin-top: 10px;
    align-items: center;
    justify-content: center;
  `,
  JjimTextNoLogin: styled.Text`
    font-size: 24px;
    font-family: Medium;
    color: #797D7F;
  `
}



const Home = ({navigation}) => {

  const [isLoggedIn, setIsLoggedIn] = useState(true);


  // const [data, setData] = useState();
  // let res;
  // useEffect(() => {
  //   async function test() {
  //     const res = await axios.get('http://3.12.241.33:8000/l-categories/먹거리/m-categories');
  //     setData(res.data)
  //   }
  //   test()

  //   axios.get('http://3.12.241.33:8000/l-categories/먹거리/m-categories')
  //     .then((res)=> {
  //       setData(res.data)
  //     })
  //   }, [data])

  const categoryList = [
    {category: "먹거리", icon: <Ionicons name="fast-food" size={24} color="white" />},
    {category: "카페", icon: <FontAwesome name="coffee" size={24} color="white" />},
    {category: "술집", icon: <Ionicons name="beer" size={24} color="white" />},
    {category: "놀거리", icon: <Entypo name="game-controller" size={24} color="white" />},
    {category: "편의시설/서비스", icon: <Ionicons name="fast-food" size={24} color="white" />},
    {category: "상점", icon: <Fontisto name="shopping-basket" size={24} color="white" />},
  ]

  const myJjim = [
    {category:"먹거리", name:"맛사랑", icon: <Ionicons name="fast-food" size={22} color="white" />},
    {category:"상점", name:"다이소", icon: <Fontisto name="shopping-basket" size={22} color="white" />},
    {category:"카페", name:"스타벅스", icon: <FontAwesome   name="coffee" size={22} color="white" />},
    {category:"놀거리", name:"코인노래방방방방", icon: <Entypo name="game-controller" size={22} color="white" />},
    {category:"편의시설/서비스", name:"미용미용실", icon: <Entypo name="game-controller" size={22} color="white" />}
  
  ];

  return <SC.Container>
    {/* Top */}
    <SC.Top>
      <SC.MainTitle>우리대학거리</SC.MainTitle>
      <SC.SchoolTitle>인하대학교</SC.SchoolTitle>
      <TouchableOpacity
        onPress={() => {navigation.navigate('Search'); }}>
        <Ionicons name="ios-search-outline" size={24} color="black" />
      </TouchableOpacity>
    </SC.Top>

    {/* Middle */}
    <SC.Middle>
      {/* 대분류 카테고리 */}
      <SC.CategoryWrap>
        {categoryList.map((item, index)=> {
          return <HomeLargeCatEle key={index} title={item.category} icon={item.icon} navigation={navigation}></HomeLargeCatEle>
        })}
      </SC.CategoryWrap>
      
      {/* 지도로 보기 버튼 */}
      <LongBarBtn 
        text="지도로 보기"
        onPress={() => alert('지도페이지 아직 안 만듦~.~')}>
      </LongBarBtn>
    </SC.Middle>


    {/* 내가 찜한 가게 */}
    <SC.Bottom>
      <SC.MainTitle>내가 찜한 가게</SC.MainTitle>
      {isLoggedIn 
      ? (<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{marginTop:15, flexDirection: 'row'}}>
          {myJjim.map((item, index) => {
            return <JjimEle key={index} category={item.category} icon={item.icon} name={item.name}></JjimEle>
          })}
        </ScrollView>)
      :  (<SC.JjimWrapNoLogin>
        <SC.JjimTextNoLogin>로그인을 해주세요 ^0^</SC.JjimTextNoLogin>
        </SC.JjimWrapNoLogin>)
      }
    </SC.Bottom>
  </SC.Container>
}

export default Home;

