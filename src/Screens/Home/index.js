import React, {useState, useEffect} from 'react';
// import 'react-native-gesture-handler';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView, Dimensions  } from 'react-native';
import {AntDesign, Ionicons ,FontAwesome,Entypo,Fontisto   } from '@expo/vector-icons';
import { RFPercentage } from "react-native-responsive-fontsize";
import styled from 'styled-components/native';
import LongBarBtn from '../../Components/LongBarBtn';
import HomeLargeCatEle from '../../Components/HomeLargeCatEle';
import JjimEle from '../../Components/JjimEle';


const Container = styled.View`
  background-color: #fff;
  padding: 0 20px;
  padding-Top: 45px;
  height: 100%;
`
const Top = styled.View`
  height: 5%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const MainTitle = styled.Text`
  font-size: 20px;
  font-family: Bold;
`
const SchoolTitle = styled(MainTitle)`
  color: #ff9933;
`
const Middle = styled.View`
  height: 70%;
  margin-bottom: 3px;
  // background-color: yellow;
  justify-content: space-between;
`
const CategoryWrap = styled.View`
  height: 90%;
  justify-content: space-between;
`
const Bottom = styled.View`
  height: 25%;
`

const JjimWrapNoLogin = styled.View`
  background-color: #EBEDEF;
  height: 75%;
  border-radius: 10px;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
`

const JjimTextNoLogin = styled.Text`
  font-size: 30px;
  font-family: Medium;
  color: #797D7F;
`


const Home = ({navigation}) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);


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

  return <Container>
    {/* Top */}
    <Top>
      <MainTitle>우리대학거리</MainTitle>
      <SchoolTitle>인하대학교</SchoolTitle>
      <TouchableOpacity
        onPress={() => {navigation.navigate('Search'); }}>
        <Ionicons name="ios-search-outline" size={24} color="black" />
      </TouchableOpacity>
    </Top>

    {/* Middle */}
    <Middle>
      {/* 대분류 카테고리 */}
      <CategoryWrap>
        {categoryList.map((item, index)=> {
          return <HomeLargeCatEle key={index} title={item.category} icon={item.icon} navigation={navigation}></HomeLargeCatEle>
        })}
      </CategoryWrap>
      
      {/* 지도로 보기 버튼 */}
      <LongBarBtn 
        text="지도로 보기"
        onPress={() => alert('지도페이지 아직 안 만듦~.~')}>
      </LongBarBtn>
    </Middle>


    {/* 내가 찜한 가게 */}
    <Bottom>
      <MainTitle>내가 찜한 가게</MainTitle>
      {isLoggedIn 
      ? (<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{marginTop:15, flexDirection: 'row'}}>
          {myJjim.map((item, index) => {
            return <JjimEle key={index} category={item.category} icon={item.icon} name={item.name}></JjimEle>
          })}
        </ScrollView>)
      :  (<JjimWrapNoLogin>
        <JjimTextNoLogin>로그인을 해주세요 ^0^</JjimTextNoLogin>
        </JjimWrapNoLogin>)
      }
    </Bottom>
  </Container>
}

export default Home;


// const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   paddingHorizontal: 20, 
  //   paddingTop: 45,
  // },
  // top: {
  //   flex: 0.7,
  //   flexDirection: 'row',
  // },
  // mainTitle: {
  //   fontSize: RFPercentage(2.5),
  //   fontWeight: "bold",
  // },
  // title: {
  //   fontSize: RFPercentage(2.4),
  //   fontWeight: "bold",
  // },
  // schoolName: {
  //   color: "#ff9933",
  //   fontSize: RFPercentage(2.5),
  //   fontWeight: "bold",
  // },
  // searchIcon: {
  //   fontSize: RFPercentage(3.5),
  // },
  // MiddleWrap: {
  //   flex:5.5,
  //   marginBottom: 20
  // },
  // categoryElementWrap: {
  //   flexDirection: 'row', 
  //   alignItems:"center", 
  //   justifyContent:"space-between", 
  //   height:"13%"
  // },
  // categoryIconWrap: {
  //   backgroundColor: "#ff9933",
  //   width: Dimensions.get('window').width*0.1,
  //   height: Dimensions.get('window').width*0.1,
  //   alignItems:"center", 
  //   justifyContent: 'center',
  //   borderRadius: 17,
  //   marginRight: 15,
  // },
  // categoryIcon : {
  //   fontSize:RFPercentage(3),
  // },
  // categoryText: {
  //   color:'black', 
  //   fontSize:RFPercentage(2.2),
  //   width:"78%", 
  //   fontWeight:"bold"
  // },

  // mapBtn: {
  //   backgroundColor: '#ff9933', 
  //   borderRadius:5, 
  //   alignItems:"center", 
  //   justifyContent: 'center', 
  //   height: Dimensions.get('window').height*0.06,
  //   marginTop: 20 
  // },
  // mapText: {
  //   fontSize: RFPercentage(2.4), 
  //   color: '#fff', 
  //   fontWeight:'bold'
  // },
  // jjimWrap: {
  //   flex:2.5,
  // },
  // jjimIcon: {
  //   fontSize:RFPercentage(2.8)
  // },
  // jjimElementWrap: {
  //   width:Dimensions.get('window').width*0.3, 
  //   height:Dimensions.get('window').width*0.3, 
  //   backgroundColor:'#EBEDEF', 
  //   marginRight:15, 
  //   borderRadius:20, 
  //   padding:10
  // },
  // jjimIcons:{
  //   flexDirection:'row', 
  //   alignItems:"center", 
  //   justifyContent: 'space-between',
  //   marginBottom:10
  // },
  // jjimIconWrap:{
  //   width:Dimensions.get('window').width*0.09,
  //   height:Dimensions.get('window').width*0.09, 
  //   backgroundColor:'#A9CCE3', 
  //   alignItems:"center", 
  //   justifyContent: 'center',
  //   borderRadius:50, 
  // },
//   jjimWrapNoLogin: {
//     backgroundColor:'#EBEDEF', 
//     height:Dimensions.get('window').width*0.3, 
//     borderRadius:20, 
//     marginTop:15,
//     alignItems:"center", 
//     justifyContent: 'center',
//   },
//   jjimTextNoLogin: {
//     fontSize: RFPercentage(3),
//     color: '#797D7F'
//   }
// });
