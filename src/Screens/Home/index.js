import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  Dimensions,
  View,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LongBarBtn from "../../Components/LongBarBtn/index";
import HomeLargeCatEle from "../../Components/HomeLargeCatEle";
import JjimEle from "../../Components/JjimEle/index";
import LargeCatEle from "../../Components/LargeCatEle";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  restoreLargeCatList,
  restoreMidCatList,
  restoreJjimStore,
  restoreCurStore,
  restoreUserNickname,
  checkSponsor,
} from "../../../reducer/index";

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
  JjimEleWrap: styled.TouchableOpacity`
    width: ${width * 0.35}px;
    height: ${width * 0.35}px;
    background-color: #ebedef;
    border-radius: 20px;
    padding: 10px;
    justify-content: center;
    align-items: center;
  `,
  NoJjimWrap: styled.View`
    width: ${width * 0.89}px;
    height: ${width * 0.35}px;
    background-color: #ebedef;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
  `,
};

const Home = ({ navigation }) => {
  const dispatch = useDispatch();

  const url = useSelector((state) => state.url);
  axios.defaults.baseURL = url;

  const [categoryList, setCategoryList] = useState([]);
  const [jjimList, setJjimList] = useState([]);

  const TOKEN_KEY = "@userKey";

  useEffect(async () => {
    let token;
    await AsyncStorage.getItem(TOKEN_KEY, (err, result) => {
      token = result;
    });

    axios
      .all([
        axios.get("/l-categories/"),
        axios.get("/l-categories/all/m-categories/"),
      ])
      .then(
        axios.spread((res1, res2) => {
          console.log("대분류, 중분류 잘 받아옴");
          const largeCategoryList = res1.data.list;
          setCategoryList(largeCategoryList);
          dispatch(restoreLargeCatList(largeCategoryList));
          const middleCategoryList = res2.data;
          dispatch(restoreMidCatList(middleCategoryList));
        })
      )
      .catch((err) => console.log("대분류, 중분류 하나 못 받아옴~~~" + err));

    axios
      .get("/users/favorites/", {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        console.log("찜 목록: " + JSON.stringify(res.data.list));
        if (res.data.list !== undefined) setJjimList(res.data.list);
        dispatch(restoreJjimStore(res.data.list));
      })
      .catch((err) => console.log("찜 목록 못 받아옴~~ " + err));
  }, []);

  const jjimjjim = useSelector((state) => state.jjimStore);
  useEffect(() => {
    if (jjimjjim) {
      setJjimList(jjimjjim);
    }
  }, [jjimjjim]);

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
              {categoryList &&
                categoryList.map((item, index) => {
                  return (
                    <LargeCatEle
                      key={index}
                      name={item.name}
                      page="MiddleCat"
                      navi={navigation}
                    ></LargeCatEle>
                  );
                })}
            </SC.CategoryWrap>
            <View style={{ alignItems: "center" }}>
              <LongBarBtn
                text="지도로 보기"
                nextPage="Map"
                navigation={navigation}
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
              {jjimList == false ? (
                <SC.NoJjimWrap>
                  <Text>찜한 가게가 없어요~</Text>
                </SC.NoJjimWrap>
              ) : (
                jjimList && jjimList.slice(0, 5).map((item, index) => {
                  return (
                    <JjimEle
                      key={index}
                      l_category={item.l_category}
                      // icon={item.icon}
                      name={item.store_name}
                      navigation={navigation}
                    ></JjimEle>
                  );
                })
              )}
              {jjimList && jjimList.length >= 5 ? (
                <SC.JjimEleWrap
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("JjimPage")}
                >
                  <Text>더보기 ^0^</Text>
                </SC.JjimEleWrap>
              ) : (
                <></>
              )}
            </ScrollView>
          </SC.Bottom>
        </ScrollView>
      </SC.Container>
    </SafeAreaView>
  );
};
export default Home;
