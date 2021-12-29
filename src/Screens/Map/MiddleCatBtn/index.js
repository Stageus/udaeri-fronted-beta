import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  Dimensions,
  Text,
  View,
  StyleSheet,
} from "react-native";
import styled, { css } from "styled-components/native";
import { useSelector, useDispatch } from "react-redux";
import { restoreCurMidCat } from "../../../../reducer/index";

const SC = {
  Wrap: styled.View`
    padding: 6px 10px;
    // border: 1px solid black;
    border-radius: 15px;
    margin-right: 5px;
    background-color: #fff;
  `,
};

const MiddleCatBtn = (props) => {
  const dispatch = useDispatch();

  return (
    <SC.Wrap style={styles.shadow}>
      <Text
        onPress={() => {
          dispatch(restoreCurMidCat(props.name));
        }}
      >
        {props.name}
      </Text>
    </SC.Wrap>
  );
};

export default MiddleCatBtn;

const styles = StyleSheet.create({
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});
