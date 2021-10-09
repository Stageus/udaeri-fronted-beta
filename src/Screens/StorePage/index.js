import React from "react";
import { SafeAreaView, Text, View } from 'react-native';

import styled from 'styled-components/native';

import StoreTapNavigator from '../../Components/Navigation/StoreTabNavi';
import HeaderBar from '../../Components/HeaderBar';

const SC = {
    Container: styled.View`
        background-Color: #fff;
    `,
    menuBar: styled.View`
        height: 100%;
    `
}


const StorePage = ({ navigation, route }) => {
    return (
        <SafeAreaView>
            <SC.Container>
                {/* 헤더 */}
                <HeaderBar left="arrow" title={route.params.key} right="heart" navigation={navigation} />
                {/* 메뉴 바 */}
                <SC.menuBar>
                    <StoreTapNavigator />
                </SC.menuBar>
            </SC.Container>
        </SafeAreaView>
    )
}

export default StorePage;