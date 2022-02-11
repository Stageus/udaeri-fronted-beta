import React, { useCallback, useState } from "react";
import styled from 'styled-components/native';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { addCurMidCatList } from "../../../../reducer/index";

import StoreEle from "../../../Components/StoreEle";

const SC = {
  flatlist: styled.FlatList`
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
  const dispatch = useDispatch();

  const curMidCatList = useSelector((state) => state.curMidCatList);
  const curLargeCat = useSelector((state) => state.curLargeCat);
  const curMidCat = props.midCat;
  const url = useSelector((state) => state.url);
  axios.defaults.baseURL = url;
  const [cnt, setCnt] = useState(1);

  if (curMidCatList != null) {
    const loadStoreList = () => {
      axios
        .get("/l-categories/" + curLargeCat + "/m-categories/" + curMidCat + "/stores/" + cnt)
        .then((res) => {
          if (res.data.list !== null) {
            dispatch(addCurMidCatList(curMidCat, res.data.list));
            setCnt(cnt + 1);
          }
        })
        .catch((err) => {
          console.log("error");
          console.log(err);
        })
    }

    // const refreshData = () => {
    //   axios
    //     .get("/l-categories/" + curLargeCat + "/m-categories/" + curMidCat + "/stores/0")
    //     .then((res) => {
    //       setSelectedMidCatList({
    //         data: res.data.list,
    //         page: 1
    //       })
    //     })
    //     .catch((err) => {
    //       console.log("error");
    //       console.log(err);
    //     });
    // }

    return (
      <SC.flatlist
        data={curMidCatList[curMidCat]}
        renderItem={(item) => StoreElement(item, props)}
        keyExtractor={(item) => String(item.store_name)}
        onEndReachedThreshold={0.01}
        onEndReached={loadStoreList}
      >
      </SC.flatlist>
    )
  }
  else {
    return (
      <></>
    )
  }
}


export default Store;
