import React, { useState, useEffect } from "react";
import { Platform, Text, StyleSheet } from "react-native";
import styled, { css } from "styled-components/native";
import { useSelector, useDispatch } from "react-redux";
import { restoreCurMidCat, restoreCurStore } from "../../../../reducer/index";

const SC = {
  Wrap: styled.View`
    padding: 6px 10px;
    // border: 1px solid black;
    border-radius: 15px;
    margin-right: 5px;
    background-color: #fff;

    ${({ target, clickedCat, clickedColor }) => {
      return target === clickedCat
        ? `background-color: ${clickedColor}`
        : "background-color: #fff";
    }}
  `,
};

const MiddleCatBtn = (props) => {
  const dispatch = useDispatch();
  const clickedMiddle = useSelector((state) => state.curMidCat);
  const mainColor = useSelector((state) => state.mainColor);

  return (
    <SC.Wrap
      style={styles.shadow}
      target={props.name}
      clickedCat={clickedMiddle}
      clickedColor={mainColor}
    >
      <Text
        onPress={() => {
          dispatch(restoreCurMidCat(props.name));
          dispatch(restoreCurStore(null));
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
