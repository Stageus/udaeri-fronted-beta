import React, { useState, useEffect } from "react";
import { SafeAreaView, StatusBar, Platform } from "react-native";

import styled, { css } from "styled-components/native";

import StoreTapNavigator from "../../Components/Navigation/StoreTabNavi";
import HeaderBar from "../../Components/HeaderBar";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { jjimCheck, restoreJjimStore, addJjim } from "../../../reducer/index";
const StatusBarHeight = StatusBar.currentHeight;

const SC = {
  Container: styled.View`
    background-color: #fff;
    ${Platform.OS === "android"
      ? css`
          padding-top: ${StatusBarHeight + 15}px;
        `
      : undefined}
  `,
  Content: styled.View`
    height: 100%;
  `,
};

const StorePage = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const url = useSelector((state) => state.url);
  axios.defaults.baseURL = url;

  const token = useSelector((state) => state.userToken);

  const jjimList = useSelector((state) => state.jjimStore); // 유저가 찜한 가게 목록들
  const jjimState = useSelector((state) => state.jjimState); // 현재 가게페이지를 찜 했는지 여부(boolean)
  const storeName = route.params.key;

  useEffect(() => {
    // axios
    //   .get("/users/favorites/", {
    //     headers: {
    //       authorization: token,
    //     },
    //   })
    //   .then((res) => {
    //     console.log("찜 목록: " + res.data.list);
    //     dispatch(restoreJjimStore(res.data.list));
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    console.log("찜 목록: " + JSON.stringify(jjimList));
    if (jjimList === undefined) dispatch(jjimCheck(false));
    else {
      for (let value of jjimList) {
        if (value["store_name"] === storeName) {
          console.log("찜 목록에 해당 가게 존재함");
          dispatch(jjimCheck(true));
          break;
        } else {
          dispatch(jjimCheck(false));
        }
      }
    }
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#FFFFFF",
        flex: 1,
      }}
    >
      <SC.Container>
        {/* 헤더 */}
        <HeaderBar
          left="arrow"
          title={storeName}
          right="heart"
          jjimState={jjimState}
          navigation={navigation}
        />
        {/* 메뉴 바 */}
        <SC.Content>
          <StoreTapNavigator />
        </SC.Content>
      </SC.Container>
    </SafeAreaView>
  );
};

export default StorePage;
