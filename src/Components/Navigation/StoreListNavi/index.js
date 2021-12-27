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
  const dispatch = useDispatch();

  const [storeList, setStoreList] = useState([])

  const url = useSelector((state) => state.url);
  axios.defaults.baseURL = url;

  useEffect(() => {
    const getStore = async () => {
      await axios
        .get("/l-categories/" + curLargeCat + "/m-categories/all/stores/")
        .then((res) => {
          //setStoreList(res.data);
          console.log("restoreCurMidCatList")
          dispatch(restoreCurMidCatList(res.data))
        })
        .catch((err) => {
          console.log("error");
          console.log(err);
        });
    }
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
      {MidCatList && MidCatList.map((item) => (
        <Tab.Screen name={item} children={() => <Store midCat={item} navigation={props.navigation} />} />
      ))}
    </Tab.Navigator>
  );
}

export default StoreListNavi;
