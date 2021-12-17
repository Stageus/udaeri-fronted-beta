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
import AsyncStorage from "@react-native-async-storage/async-storage";
import LongBarBtn from "../../Components/LongBarBtn/index";
import HomeLargeCatEle from "../../Components/HomeLargeCatEle";
import JjimEle from "../../Components/JjimEle/index";
import CatEle from "../../Components/CatEle";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { largeCategory } from "../../../reducer/index";

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

const Home = ({ navigation, route }) => {
  const token = route.params;
  // console.log(token);

  const dispatch = useDispatch();

  const [categoryList, setCategoryList] = useState([]);

  const url = useSelector((state) => state.url);
  const tokentoken = useSelector((state) => state.userToken);

  useEffect(() => {
    axios
      .get(url + "/l-categories/")
      .then((res) => {
        console.log("카테고리 받아쑴");
        setCategoryList(res.data.list);
        dispatch(largeCategory(res.data.list));
      })
      .catch((err) => {
        console.log("카테고리 못받아쑴");
        console.log(err);
      });

    axios
      .get(url + "/users/favorites", {
        headers: {
          authorization: token,
        },
      })
      .then(function (res) {
        console.log(res.data.list);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

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
