import React, { useState } from "react";
import { SafeAreaView, StatusBar, Platform, } from 'react-native';
import styled, { css } from 'styled-components/native';

import HeaderBar from '../../Components/HeaderBar';
import StoreListNavi from '../../Components/Navigation/StoreListNavi';

import { useSelector, useDispatch } from "react-redux";

const SC = {
    Container: styled.View`
        background-Color: #fff;
        ${Platform.OS === "android"
            ? css`
                padding-top: ${StatusBar.currentHeight}px;
            `
            : undefined}
    `,
    storeContainer: styled.View`
        height: 100%;
    `,
    Content: styled.View`
        height: 100%;
        border-top-width: 0.75px;
        border-color: #f1f1f1;
    `,
}
const StoreList = ({ navigation }) => {
    const curLargeCat = useSelector((state) => state.curLargeCat);
    const curMidCat = useSelector((state) => state.curMidCat);

    return (
        <SafeAreaView style={{
            backgroundColor: "#FFFFFF",
            flex: 1,
        }}>
            <SC.Container>
                {/* 헤더 */}
                <HeaderBar left="arrow" title={curLargeCat} right="magni" navigation={navigation} />
                <SC.Content>
                    <StoreListNavi title={curMidCat} />
                </SC.Content>
            </SC.Container>
        </SafeAreaView>

    )
}

export default StoreList;