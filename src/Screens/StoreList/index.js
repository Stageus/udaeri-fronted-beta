import React, { useState } from "react";
import { StyleSheet, Text, View, StatusBar, ScrollView, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';
import styled from 'styled-components/native';

import HeaderBar from '../../Components/HeaderBar';
import HorizontalBar from '../../Components/HorizontalBar';
import StoreEle from '../../Components/StoreEle';
import StoreListNavi from '../../Components/Navigation/StoreListNavi';

const SC = {
    Container: styled.View`
        background-Color: #fff;
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
const StoreList = ({ navigation, route }) => {
    return (
        <SafeAreaView>
            <SC.Container>
                {/* 헤더 */}
                <HeaderBar left="arrow" title={route.params.key} right="magni" navigation={navigation} />
                <SC.Content>
                    <StoreListNavi title={route.params.key} />
                </SC.Content>
            </SC.Container>
        </SafeAreaView>

    )
}

export default StoreList;