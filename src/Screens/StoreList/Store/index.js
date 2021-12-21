import React, { useState, useEffect } from "react";
import { ScrollView, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

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

  let addCnt = 0;

  const loadStoreList = () => {
    const curLargeCat = useSelector((state) => state.curLargeCat);
    const curMidCat = useSelector((state) => state.curMidCat);
    const url = useSelector((state) => state.url);
    axios.defaults.baseURL = url;
    if (addCnt !== 0) {
      axios
        .get("/l-categories/" + curLargeCat + "/m-categories/" + curMidCat + "/stores/" + addCnt)
        .then((res) => {
          // console.log(res.data.list);
          console.log("?");
        })
        .catch((err) => {
          console.log("error");
          console.log(err);
        });
    }


    addCnt += 1;
    console.log(curMidCat, "addCnt : ", addCnt)
    //console.log("selectedMidCatList :", selectedMidCatList);
  }

  return (
    <SC.storeContainer
      data={selectedMidCatList}
      renderItem={(item) => StoreElement(item, props)}
      keyExtractor={(item) => String(item.store_name)}
      onEndReachedThreshold={0.1}
      onEndReached={(info) => { console.log(JSON.stringify(info)); }}
    >
    </SC.storeContainer>
  )
}

export default Store;
