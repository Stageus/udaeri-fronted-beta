import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons, Entypo } from '@expo/vector-icons';

const SC = {
    Container: styled.View`
        flex-Direction: row;
        padding: 15px;
        border-Bottom-Color: gray;
        border-Bottom-Width: 0.5px;
        align-Items: center;
    `,
    storeThumbnail: styled.View`
        background-Color: #ff9933;
        width: 10vw;
        height: 10vw;
        align-Items: center;
        justify-Content: center;
        border-Radius: 10vw;
        margin-Right: 20px;
    `,
    contentContainer: styled.View`
    `,
    storeName: styled.Text`
        font-Family: Medium;
        font-Size: 15px;
    `,
    content: styled.Text`
        font-Family: Regular;
        font-Size: 12px;
    `,
    wrap: styled.View`
        flex-direction: row;
        align-content:  center;
        align-items: center;
    `,
    loaction: styled.Text`
        font-family: Light;
        margin-right: 5px;
    `,
    distance: styled.Text`
        font-family: Light;
        margin-right: 5px;
    `,
    likes: styled.Text`
        font-family: Light;
    `,
}
const StoreEle = (props) => {
    return (
        <SC.Container>
            <SC.storeThumbnail>
            </SC.storeThumbnail>
            <SC.contentContainer>
                <SC.storeName>{props.storeName}</SC.storeName>
                <SC.content>{props.content}</SC.content>
                <SC.wrap>
                    <SC.loaction>{props.location}</SC.loaction>
                    <Entypo name="location-pin" size={12} color="green" />
                    <SC.distance>{props.distance}</SC.distance>
                    <Ionicons name="ios-heart-circle-outline" size={12} color="red" />
                    <SC.likes>{props.likes}</SC.likes>
                </SC.wrap>
            </SC.contentContainer>
        </SC.Container>
    )
}

export default StoreEle;
