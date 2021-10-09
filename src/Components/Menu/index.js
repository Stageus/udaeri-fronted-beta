import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';

const SC = {
    menuEleWrap: styled.View`
        flex-Direction: row;
        align-Items: center;
        justify-Content: space-between;
        border-Style: solid;
        border-bottom-width : 1px;
        border-bottom-color: #d3d3d3;
        padding: 20px;
    `,
    contentWrap: styled.View`
    `,
    menuName: styled.Text`
        font-Family: Medium;
        font-Size: 18px;
    `,
    menuDes: styled.Text`
        font-Family: Medium;
        font-Size: 16px;
    `,
    menuPrice: styled.Text`
        font-Family: Light;
        font-Size: 14px;
    `,
    menuThumbnail: styled.View`
        background-Color: #ff9933;
        width: 40px;
        height: 40px;
        align-Items: center;
        justify-Content: center;
        border-Radius: 20px;
    `,
}

const Menu = (props) => {
    return (
        <SC.menuEleWrap>
            <SC.contentWrap>
                <SC.menuName>{props.menuName}</SC.menuName>
                <SC.menuDes>{props.menuDes}</SC.menuDes>
                <SC.menuPrice>{props.menuPrice}</SC.menuPrice>
            </SC.contentWrap>
            <SC.menuThumbnail>
            </SC.menuThumbnail>
        </SC.menuEleWrap>
    )
}

export default Menu;
