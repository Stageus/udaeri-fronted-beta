import React, { useState, useEffect } from "react";
// import 'react-native-gesture-handler';
import {
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  Dimensions,
  View,
} from "react-native";
import {
  AntDesign,
  Ionicons,
  FontAwesome,
  Entypo,
  Fontisto,
} from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";
import LongBarBtn from "../../Components/LongBarBtn/index";
import HomeLargeCatEle from "../../Components/HomeLargeCatEle";
import JjimEle from "../../Components/JjimEle/index";
import CatEle from "../../Components/CatEle";
import axios from "axios";

const StatusBarHeight = StatusBar.currentHeight;
const { width, height } = Dimensions.get("window");

const SC = {
  Container: styled.View`
    background-color: #fff;
    padding: 0 20px;

    ${Platform.OS === "android"
      ? css`
          padding-top: ${StatusBarHeight + 15}px;
        `
      : undefined}
  `,
  Top: styled.View`
    // height: ${height * 0.05}px;
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
    // height: ${height * 0.5}px;
    padding-top: 10px;
    margin-bottom: 25px;
    justify-content: space-between;
  `,
  CategoryWrap: styled.View`
    // height: ${height * 0.2}px;
    justify-content: space-between;
    margin-bottom: 10px;
  `,
  Bottom: styled.View`
    height: ${height * 0.25}px;
  `,
  JjimWrapNoLogin: styled.View`
    background-color: #ebedef;
    height: 75%;
    border-radius: 10px;
    margin-top: 10px;
    align-items: center;
    justify-content: center;
  `,
  JjimTextNoLogin: styled.Text`
    font-size: 24px;
    font-family: Medium;
    color: #797d7f;
  `,
};

const Home = ({ navigation }) => {
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

  // const [categoryList, setCategoryList] = useState([]);

  // const url = "http://3.12.241.33:8000";
  // useEffect(() => {
  //   axios
  //     .get(url + "/l-categories/")
  //     .then((res) => {
  //       console.log(res.data.list);
  //       setCategoryList(res.data.list);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // console.log(categoryList);

  const categoryList = [
    {
      name: "먹거리",
      icon: <Ionicons name="fast-food" size={24} color="white" />,
    },
    {
      name: "카페",
      icon: <FontAwesome name="coffee" size={24} color="white" />,
    },
    {
      name: "술집",
      icon: <Ionicons name="beer" size={24} color="white" />,
    },
    {
      name: "놀거리",
      icon: <Entypo name="game-controller" size={24} color="white" />,
    },
    {
      name: "편의시설/서비스",
      icon: <Ionicons name="fast-food" size={24} color="white" />,
    },
    {
      name: "상점",
      icon: <Fontisto name="shopping-basket" size={24} color="white" />,
    },
  ];

  const myJjim = [
    {
      category: "먹거리",
      name: "맛사랑",
      icon: <Ionicons name="fast-food" size={22} color="white" />,
    },
    {
      category: "상점",
      name: "다이소",
      icon: <Fontisto name="shopping-basket" size={22} color="white" />,
    },
    {
      category: "카페",
      name: "스타벅스",
      icon: <FontAwesome name="coffee" size={22} color="white" />,
    },
    {
      category: "놀거리",
      name: "코인노래방방방방",
      icon: <Entypo name="game-controller" size={22} color="white" />,
    },
    {
      category: "편의시설/서비스",
      name: "미용미용실",
      icon: <Entypo name="game-controller" size={22} color="white" />,
    },
  ];

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#FFFFFF",
        flex: 1,
      }}
    >
      <SC.Container>
        {/* Top */}
        <SC.Top>
          <SC.MainTitle>우리대학거리</SC.MainTitle>
          <SC.SchoolTitle>인하대학교</SC.SchoolTitle>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Search");
            }}
          >
            <Ionicons name="ios-search-outline" size={24} color="black" />
          </TouchableOpacity>
        </SC.Top>

        <ScrollView showsHorizontalScrollIndicator={false}>
          <SC.Middle>
            <SC.CategoryWrap>
              {categoryList.map((item, index) => {
                return (
                  <CatEle
                    key={index}
                    name={item.name}
                    page="MiddleCat"
                    navi={navigation}
                  ></CatEle>
                );
              })}
            </SC.CategoryWrap>
            <View style={{ alignItems: "center" }}>
              <LongBarBtn
                text="지도로 보기"
                page="Map"
                navi={navigation}
              ></LongBarBtn>
            </View>
          </SC.Middle>
          <SC.Bottom>
            <SC.MainTitle>내가 찜한 가게</SC.MainTitle>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ marginTop: 15, flexDirection: "row" }}
            >
              {myJjim.map((item, index) => {
                return (
                  <JjimEle
                    key={index}
                    category={item.category}
                    icon={item.icon}
                    name={item.name}
                  ></JjimEle>
                );
              })}
            </ScrollView>
          </SC.Bottom>
        </ScrollView>
      </SC.Container>
    </SafeAreaView>
  );
};

export default Home;
