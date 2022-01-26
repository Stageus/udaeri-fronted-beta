import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, Platform, StatusBar } from "react-native";
import styled, { css } from "styled-components/native";
import HeaderBar from "../../Components/HeaderBar";
import MidCatEle from "../../Components/MidCatEle";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
const SC = {
  Container: styled.View`
    background-color: #ffffff;
    ${Platform.OS === "android"
      ? css`
          padding-top: ${StatusBar.currentHeight}px;
        `
      : undefined}
  `,
  mainContainer: styled.View`
    height: 100%;
    padding: 0 20px;
  `,
};

const MiddleCat = ({ navigation }) => {
  const curLargeCat = useSelector((state) => state.curLargeCat);
  const midCatList = useSelector((state) => state.midCatList[curLargeCat]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#FFFFFF",
        flex: 1,
      }}
    >
      <SC.Container>
        <HeaderBar left="arrow" title={curLargeCat} navigation={navigation} />

        <SC.mainContainer>
          <ScrollView>
            {midCatList &&
              midCatList.map((item, index) => (
                <MidCatEle
                  key={index}
                  name={item}
                  icon={<></>}
                  page="StoreList"
                  navi={navigation}
                />
              ))}
          </ScrollView>
        </SC.mainContainer>
      </SC.Container>
    </SafeAreaView>
  );
};
export default MiddleCat;
