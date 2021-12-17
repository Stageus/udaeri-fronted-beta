import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, Platform, StatusBar } from 'react-native';
import styled, { css } from 'styled-components/native';
import HeaderBar from '../../Components/HeaderBar';
import CatEle from '../../Components/CatEle';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const SC = {
    Container: styled.View`
        background-color: #ffffff;
        ${Platform.OS === "android"
            ? css`
          padding-top: ${StatusBar.currentHeight}px;
        `
            : undefined}
    `,
    mainContainer: styled.View`
        height : 100%;
        padding : 0 20px;
    `,
}

const MiddleCat = ({ navigation, route }) => {

    const [midCatList, setMidCatList] = useState([]);
    const url = useSelector((state) => state.url);
    axios.defaults.baseURL = url;

    const curCat = useSelector((state) => state.curCat);

    useEffect(() => {
        axios
            .get("/l-categories/" + curCat + "/m-categories/")
            .then((res) => {
                console.log("OK");
                setMidCatList(res.data.list);
            })
            .catch((err) => {
                console.log("카테고리 못받아쑴");
                console.log(err);
            });
    }, []);

    return (
        <SafeAreaView>
            <SC.Container>
                <HeaderBar left="arrow" title={route.params.key} right="magni" navigation={navigation} />

                <SC.mainContainer>
                    <ScrollView>
                        {midCatList.map((item) => (
                            <CatEle name={item.name} icon={<></>} page="StoreList" navi={navigation} />
                        ))}
                    </ScrollView>
                </SC.mainContainer>
            </SC.Container>
        </SafeAreaView>
    )
}
export default MiddleCat;