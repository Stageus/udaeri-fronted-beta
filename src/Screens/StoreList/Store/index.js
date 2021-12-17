import React, { useState, useEffect } from "react";
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import StoreEle from '../../../Components/StoreEle';

const SC = {
    Container: styled.View`
    background-color: #ffffff;
    `,
    storeContainer: styled.ScrollView`
        height: auto;
        background-color: #ffffff;
    `
}
const Store = ({ navigation }) => {

    const [StoreList, setStoreList] = useState({});
    const curLargeCat = useSelector((state) => state.curLargeCat);
    const curMidCat = useSelector((state) => state.curMidCat);

    const url = useSelector((state) => state.url);
    axios.defaults.baseURL = url;
    useEffect(() => {
        axios
            .get("/l-categories/" + curLargeCat + "/m-categories/" + curMidCat + "/stores")
            .then((res) => {
                console.log(res.data.list);
            })
            .catch((err) => {
                console.log("error");
                console.log(err);
            });
    }, [])

    return (
        <SC.storeContainer>
            {/* {StoreList && StoreList.map((item) => (
                <StoreEle
                    storeName={item.storeName}
                    content={item.content}
                    location={item.location}
                    distance={item.distance}
                    likes={item.likes}
                    navigation={navigation}
                />
            ))} */}
        </SC.storeContainer>
    )
}

export default Store;