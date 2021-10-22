import React from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import Menu from '../../../Components/Menu'
import styled from 'styled-components/native'

const Container = styled.View`
    background-color: #fff;
`;

const SC = {
    Container: styled.View`
        background-color: #fff;
        height: 100%;
    `,

}

const StoreMenuTab = () => {
    const menuList = [
        {
            menuName: "제육볶음",
            menuDes: "매콤한 돼지고기 볶음",
            menuPrice: "5,500 원"
        },
        {
            menuName: "치킨까스",
            menuDes: "바삭한 치킨까스",
            menuPrice: "5,500 원"
        },
        {
            menuName: "돈까스",
            menuDes: "바삭한 돈까스",
            menuPrice: "5,500 원"
        },
        {
            menuName: "순두부찌개",
            menuDes: "얼큰한 순두부찌개",
            menuPrice: "5,500 원"
        },
        {
            menuName: "김치찌개",
            menuDes: "칼칼한 생고기 김치찌개",
            menuPrice: "5,500 원"
        }
    ]

    return (
        <SC.Container>
            <ScrollView>
                {menuList.map((item) => (
                    <Menu menuName={item.menuName} menuDes={item.menuDes} menuPrice={item.menuPrice} />
                ))}
            </ScrollView>
        </SC.Container>
    );

}

export default StoreMenuTab;