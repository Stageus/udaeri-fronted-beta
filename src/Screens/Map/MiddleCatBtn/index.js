import React, { useState } from "react";
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

const SC = {
  Wrap: styled.View`
    padding: 4px 10px;
    border: 1px solid black;
    border-radius: 20px;
    margin-right: 5px;
  `,
};

const MiddleCatBtn = (props) => {
  return (
    <SC.Wrap>
      <Text>{props.name}</Text>
    </SC.Wrap>
  );
};

export default MiddleCatBtn;
