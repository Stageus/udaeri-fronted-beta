import React from "react";
import { SafeAreaView, Text, View } from 'react-native';

import styled from 'styled-components/native';


import StoreTapNavigator from '../../Components/Navigation/StoreTabNavi';
import HeaderBar from '../../Components/HeaderBar';

const SC = {
    Container: styled.View`
        background-Color: #fff;
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