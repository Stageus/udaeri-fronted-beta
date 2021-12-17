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
import MiddleCatBtn from "../MiddleCatBtn/index";

const MiddleCatBtnWrap = (props) => {
  const category = props.cat;
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {category.map((item, index) => {
        return <MiddleCatBtn key={index} name={item.name}></MiddleCatBtn>;
      })}
    </ScrollView>
  );
};

export default MiddleCatBtnWrap;
