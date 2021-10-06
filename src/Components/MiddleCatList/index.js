import React from 'react';
import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';

const SC = {
    Container: styled.View`
        height: 50px;
        align-Items: center;
        flex-Direction: row;
        justify-Content: space-between;
        padding: 20px 20px;    
    `,
    left: styled.View`
        flex-Direction: row;
        align-Items: center;
    `,
    thumbnail: styled.View`
        background-Color: #ff9933;
        width: 10vw;
        height: 10vw;
        align-Items: center;
        justify-Content: center;
        border-Radius: 10vw;
        margin-Right: 15px;
    `,
    catTitle: styled.Text`
        font-family: Regular;
        color : black;
    `,

}
const MiddleCatList = (props) => {
    return (
        <SC.Container key={props.key}>
            <SC.left>
                <SC.thumbnail></SC.thumbnail>
                <SC.catTitle>{props.name}</SC.catTitle>
            </SC.left>
            <MaterialIcons name="arrow-forward-ios" size={12} color="gray" />
        </SC.Container>
    )
}

export default MiddleCatList
