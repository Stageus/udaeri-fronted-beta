import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

const SC = {
    storeInfoWrap: styled.View`
        flex-Direction: row;
        justify-Content: space-between;
        margin-Bottom: 10px;
    `,
    storeInfoTitle: styled.Text`
        font-Family: Regular;
        font-Size: 16px;
        color: gray;
    `,
    storeInfoText: styled.Text`
        font-Family: Medium;
        font-Size: 16px;
        color: gray;
    `
}
const StoreInfoEle = (props) => {
    return (
        <SC.storeInfoWrap>
            <SC.storeInfoTitle>{props.infoTitle}</SC.storeInfoTitle>
            <SC.storeInfoText>{props.infoContent}</SC.storeInfoText>
        </SC.storeInfoWrap>
    )
}

export default StoreInfoEle;
