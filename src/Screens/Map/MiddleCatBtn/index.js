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
} from "react-native";
import styled, { css } from "styled-components/native";
import { useSelector, useDispatch } from "react-redux";
import { mapMiddleCatClick } from "../../../../reducer/index";

const SC = {
  Wrap: styled.View`
    padding: 4px 10px;
    border: 1px solid black;
    border-radius: 20px;
    margin-right: 5px;
  `,
};

const MiddleCatBtn = (props) => {
  const dispatch = useDispatch();
  // const clickedBtn = useSelector((state) => state.mapMiddleCatBtn);

  return (
    <SC.Wrap>
      <Text
        onPress={() => {
          dispatch(mapMiddleCatClick(props.name));
        }}
      >
        {props.name}
      </Text>
    </SC.Wrap>
  );
};

export default MiddleCatBtn;
