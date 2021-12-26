import React, { useState } from "react";
import { ScrollView } from "react-native";
import MiddleCatBtn from "../MiddleCatBtn/index";

const MiddleCatBtnWrap = (props) => {
  const category = props.cat;
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {category.map((item, index) => {
        return <MiddleCatBtn key={index} name={item}></MiddleCatBtn>;
      })}
    </ScrollView>
  );
};

export default MiddleCatBtnWrap;
