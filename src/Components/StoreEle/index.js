import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import { Ionicons, Entypo } from '@expo/vector-icons';

const SC = {
    Container: styled.TouchableOpacity`
        flex-Direction: row;
        padding: 20px;
        border-Bottom-Color: gray;
        border-Bottom-Width: 0.5px;
        align-Items: center;
        height: 100px;
    `,
    storeThumbnail: styled.View`
        background-Color: #ff9933;
        width: 20px;
        height: 20px;
        align-Items: center;
        justify-Content: center;
        border-Radius: 10px;
        margin-Right: 20px;
    `,
    contentContainer: styled.View`
    `,
    storeName: styled.Text`
        font-Family: Medium;
        font-Size: 20px;
    `,
    content: styled.Text`
        font-Family: Regular;
        font-Size: 18px;
    `,
    wrap: styled.View`
        flex-direction: row;
        align-content:  center;
        align-items: center;
    `,
    loaction: styled.Text`
        font-family: Light;
        margin-right: 5px;
        font-Size: 15px;
    `,
    distance: styled.Text`
        font-family: Light;
        margin-right: 5px;
        font-Size: 15px;
    `,
    likes: styled.Text`
        font-family: Light;
        font-Size: 15px;
    `,
}
const StoreEle = (props) => {
    return (
        <SC.Container onPress={() => {
            props.navigation.navigate('StorePage', { key: props.storeName });
        }}>
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
