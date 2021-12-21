import React, { useState, useEffect } from "react";
import { ScrollView, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { useSelector, useDispatch } from "react-redux";

import StoreEle from "../../../Components/StoreEle";

const SC = {
  Container: styled.View`
    background-color: #ffffff;
    `,
  storeContainer: styled.FlatList`
        height: 100%;
        background-color: #ffffff;
    `
}

const StoreElement = ({ item }, props) => {
  return (
    <StoreEle
      storeName={item.store_name}
      content={item.main_menu}
      location={item.s_name}
      navigation={props.navigation}
    />
  )
}

const Store = (props) => {
  const selectedMidCatList = props.selectedMidCatList;

  return (
    <SC.storeContainer
      data={selectedMidCatList}
      renderItem={(item) => StoreElement(item, props)}
      keyExtractor={(item) => String(item.store_name)}
      windowSize={1}
    >
    </SC.storeContainer>
  )
}

export default Store;
