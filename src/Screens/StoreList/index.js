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
const StoreListPage = ({ navigation, route }) => {
    const MiddleCatList = [
        { category: "한식" },
        { category: "분식" },
        { category: "양식" },
        { category: "일식" },
        { category: "중식" },
        { category: "피자" },
        { category: "치킨" },
        { category: "찜/탕" },
    ]

    return (
        <SafeAreaView>
            <SC.Container>
                {/* 헤더 */}
                <HeaderBar left="arrow" title={route.params.key} right="magni" navigation={navigation} />

                {/* 분류 카테고리 
                <HorizontalBar catList={MiddleCatList} curCat={route.params.key} navigation={navigation} />
                */}
                {/* 가게 리스트 
                <SC.storeContainer>
                    <ScrollView>
                        {StoreList.map((item) => (
                            <StoreEle
                                storeName={item.storeName}
                                content={item.content}
                                location={item.location}
                                distance={item.distance}
                                likes={item.likes}
                                navigation={navigation}
                            />
                        ))}
                    </ScrollView>
                </SC.storeContainer>*/}
                <SC.Content>
                    <StoreListNavi title={route.params.key} />
                </SC.Content>
            </SC.Container>
        </SafeAreaView>

    )
}

export default StoreListPage;