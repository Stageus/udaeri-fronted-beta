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

const StatusBarHeight = StatusBar.currentHeight;

const SC = {
  Container: styled.View`
    background-color: #fff;
    ${Platform.OS === "android"
      ? css`
          padding-top: ${StatusBarHeight}px;
        `
      : undefined}
  `,
  JjimContainer: styled.View`
    height: 100%;
    padding: 0 20px;
  `,
};
const JjimPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const JjimList = useSelector((state) => state.jjimStore);

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
            {JjimList.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    paddingVertical: 10,
                  }}
                  onPress={() => {
                    navigation.navigate("StorePage", {
                      key: item.store_name,
                    });
                    dispatch(restoreCurStore(item.store_name));
                  }}
                >
                  <Text>{item.store_name}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </SC.JjimContainer>
      </SC.Container>
    </SafeAreaView>
  );
};

export default JjimPage;
