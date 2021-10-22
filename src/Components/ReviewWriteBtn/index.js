import React from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { Foundation } from '@expo/vector-icons';
const { width, height } = Dimensions.get('window');
const SC = {
    Container: styled.TouchableOpacity`
        position: absolute;
        bottom: 0;
        align-Self: flex-end;
        margin: 40px;
        background-Color: #ff9933;
        width: ${width / 10}px;
        height: ${width / 10}px;
        align-Items: center;
        justify-Content: center;
        border-Radius: ${height / 10}px;
    `,
}

const ReviewWriteBtn = () => {
    return (
        <SC.Container>
            <Foundation name="pencil" size={24} color="white" />
        </SC.Container>
    )
}

export default ReviewWriteBtn;