import React, { useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useSelector, useDispatch } from "react-redux";
import { restoreCurMidCatList } from "../../../../reducer/index";

import axios from "axios";
import Store from "../../../Screens/StoreList/Store";
const Tab = createMaterialTopTabNavigator();


const StoreListNavi = (props) => {
  const curLargeCat = useSelector((state) => state.curLargeCat);
  const MidCatList = useSelector((state) => state.midCatList[curLargeCat]);
  const lineColor2 = useSelector((state) => state.midCatList[lineColor2]);
  const lineColor3 = useSelector((state) => state.midCatList[lineColor3]);
  const dispatch = useDispatch();

  const url = useSelector((state) => state.url);
  axios.defaults.baseURL = url;

  const getStore = async () => {
    await axios
      .get("/l-categories/" + curLargeCat + "/m-categories/all/stores/")
      .then((res) => {
        dispatch(restoreCurMidCatList(res.data))
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
      });
  }
  useEffect(() => {
    
    getStore();
  }, [])
  return (
    <Tab.Navigator tabBarOptions={{
      labelStyle: {
        fontSize: 14,
        fontFamily: 'Medium',
      },
      indicatorStyle: {
        borderColor: '#ff9933',
        borderWidth: 1
      },
      scrollEnabled: true,
      tabStyle: {
        width: 90,
      },
      activeTintColor: '#ff9933',
      inactiveTintColor: 'gray',

    }}
      initialRouteName={props.title}
      tabBarLabel={{
        focused: false,
      }}
    >
      { 
        props.title === "술집" ?
        <Tab.Screen name={props.title} children={() => <Store key={props.title} midCat={props.title} navigation={props.navigation} />} /> :
        MidCatList && MidCatList.map((item, index) => (
          <Tab.Screen name={item} children={() => <Store key={item} midCat={item} navigation={props.navigation} />} />
      ))}
    </Tab.Navigator>
  );
}

export default StoreListNavi;
