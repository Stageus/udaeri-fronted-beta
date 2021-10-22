import React from 'react';
import styled from 'styled-components/native';
import { StyleSheet, View, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const SC = {
    Container: styled.TouchableOpacity`
        align-Items: center;
        flex-Direction: row;
        justify-Content: space-between;
        padding: 0 20px;
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
const CatEle = (props) => {
    return (
        <SC.Container onPress={() => {
            props.navi.navigate('StoreList', { key: props.name });
        }}>
            <SC.left>
                <SC.thumbnail>{props.icon}</SC.thumbnail>
                <SC.catTitle>{props.name}</SC.catTitle>
            </SC.left>
            <MaterialIcons name="arrow-forward-ios" size={12} color="gray" />
        </SC.Container>
    )
}

export default CatEle
