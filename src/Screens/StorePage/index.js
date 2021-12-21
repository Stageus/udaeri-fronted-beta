import React from "react";
import { SafeAreaView, StatusBar, Platform, } from 'react-native';

import styled, { css } from 'styled-components/native';


import StoreTapNavigator from '../../Components/Navigation/StoreTabNavi';
import HeaderBar from '../../Components/HeaderBar';

const StatusBarHeight = StatusBar.currentHeight;

const SC = {
    Container: styled.View`
        background-Color: #fff;
        ${Platform.OS === "android"
            ? css`
                padding-top: ${StatusBarHeight + 15}px;
            `
            : undefined}
    `,
    Content: styled.View`
        height: 100%;
    `
}


const StorePage = ({ navigation, route }) => {
    return (
        <SafeAreaView style={{
            backgroundColor: "#FFFFFF",
            flex: 1,
        }}>
            <SC.Container>
                {/* 헤더 */}
                <HeaderBar left="arrow" title={route.params.key} right="heart" navigation={navigation} />
                {/* 메뉴 바 */}
                <SC.Content>
                    <StoreTapNavigator />
                </SC.Content>
            </SC.Container>
        </SafeAreaView>
    )
}

export default StorePage;