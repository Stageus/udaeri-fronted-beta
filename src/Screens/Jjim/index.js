import React, { useState, useEffect } from "react";
import {
  View,
  StatusBar,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";
import HeaderBar from "../../Components/HeaderBar/index";
import { useSelector, useDispatch } from "react-redux";
import { restoreCurStore } from "../../../reducer/index";
import StoreEle from "../../Components/StoreEle";

const StatusBarHeight = StatusBar.currentHeight;

const SC = {
  Container: styled.View`
    background-color: #fff;
  `,
  JjimContainer: styled.View`
    height: 100%;
  `,
};
const JjimPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const jjimList = useSelector((state) => state.jjimStore);
  console.log(jjimList);
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#FFFFFF",
        flex: 1,
      }}
    >
      <SC.Container>
        <HeaderBar
          left="arrow"
          title="찜"
          right="magni"
          navigation={navigation}
        />
        <SC.JjimContainer>
          <ScrollView>
            {jjimList.map((item, index) => {
              return (
                <StoreEle
                  storeName={item.store_name}
                  content={""}
                  location={""}
                  navigation={navigation}
                />
              );
            })}
          </ScrollView>
        </SC.JjimContainer>
      </SC.Container>
    </SafeAreaView>
  );
};

export default JjimPage;
