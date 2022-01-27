import React from 'react';
import styled from 'styled-components/native';
import { StyleSheet, View, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from "react-redux";
import { restoreCurMidCat } from '../../../reducer/index';

const SC = {
    Container: styled.TouchableOpacity`
        align-Items: center;
        flex-Direction: row;
        justify-Content: space-between;
        margin : 7.5px 0;
    `,
    left: styled.View`
        flex-Direction: row;
        align-Items: center;
    `,
    iconWrap: styled.View`
        background-color: #ff9933;
        width : 20px;
        height : 20px;
        align-items: center;
        justify-content: center;
        border-radius: 17px;
        margin-right: 15px;
    `,
    thumbnail: styled.View`
        background-Color: #ff9933;
        width: 32px;
        height: 32px;
        align-Items: center;
        justify-Content: center;
        border-radius: 16px;
        margin-Right: 15px;
    `,
    catTitle: styled.Text`
        font-family: Regular;
        font-size: 18px;
        color : black;
    `,
}


const MidCatEle = (props) => {
    const dispatch = useDispatch();

    return (
        <SC.Container onPress={() => {
            props.navi.navigate(props.page, { key: props.name });
            dispatch(restoreCurMidCat(props.name));
        }}>
            <SC.left>
                <SC.thumbnail>{props.icon}</SC.thumbnail>
                <SC.catTitle>{props.name}</SC.catTitle>
            </SC.left>
            <MaterialIcons name="arrow-forward-ios" size={12} color="gray" />
        </SC.Container>
    )
}

export default MidCatEle
