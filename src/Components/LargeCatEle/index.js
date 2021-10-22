import React from 'react';
import { View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components/native';

const SC = {
    categoryElementWrap: styled.View`
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height : 13%;
    `,
    categoryIconWrap: styled.View`
        background-color: #ff9933;
        width : 20px;
        height : 20px;
        align-items: center;
        justify-content: center;
        border-radius: 17px;
        margin-right: 15px;
    `,
    categoryText: styled.Text`
        color : black;
        font-size : 10px;
        width: 78%;
        font-weight: bold;
    `,
}

const LargeCatEle = (props) => {
    return (
        <SC.categoryElementWrap key={props.key}>
            <SC.categoryIconWrap>
                {props.icon}
            </SC.categoryIconWrap>
            <SC.categoryText>{props.category}</SC.categoryText>
            <AntDesign name="right" size={15} color="black" />
        </SC.categoryElementWrap>
    )
}

export default LargeCatEle;
