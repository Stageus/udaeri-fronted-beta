import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Dimensions } from "react-native";
import MenuEle from "../../../Components/MenuEle";
import styled from "styled-components/native";
import { useSelector } from "react-redux";
import axios from "axios";

const SC = {
  Container: styled.View`
    background-color: #fff;
    height: 100%;
  `,
};

const StoreMenuTab = () => {
  const curLargeCat = useSelector((state) => state.curLargeCat);
  const curMidCat = useSelector((state) => state.curMidCat);
  const curStore = useSelector((state) => state.curStore);
  const [storeMenu, setStoreMenu] = useState([]);

  useEffect(() => {
    const getStore = async () => {
      await axios
        .get(
          "/l-categories/" +
            curLargeCat +
            "/m-categories/" +
            curMidCat +
            "/stores/" +
            curStore +
            "/menu"
        )
        .then((res) => {
          setStoreMenu(res.data.list);
        })
        .catch((err) => {
          console.log("error");
          console.log(err);
        });
    };
    getStore();
  }, []);
  return (
    <SC.Container>
      <ScrollView>
        {storeMenu &&
          storeMenu.map((item, index) => {
            return (
              <MenuEle
                key={index}
                menuName={item.menu_name}
                menuDes={item.brief_info}
                menuPrice={item.price}
              />
            );
          })}
      </ScrollView>
    </SC.Container>
  );
};

export default StoreMenuTab;
