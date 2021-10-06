import React from 'react';
import styled from 'styled-components/native';
import { Foundation } from '@expo/vector-icons';

const SC = {
    Container: styled.TouchableOpacity`
        position: absolute;
        bottom: 0;
        align-Self: flex-end;
        margin: 25px;
        background-Color: #ff9933;
        width: 15vw;
        height: 15vw;
        align-Items: center;
        justify-Content: center;
        border-Radius: 15vw;
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