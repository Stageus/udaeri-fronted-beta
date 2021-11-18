import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import styled from 'styled-components/native';
const SC = {
    headerBar: styled.View`
        height : 5%;
        align-items: center;
        flex-direction: row;
        justify-content: space-between;
        padding : 0 20px;
        border-bottom-width : 1px;
        border-color: #d3d3d3;
    `,
    storeName: styled.Text`
        font-family: Bold;
        font-size: 24px;
    `,
}

const HeaderBar = (props) => {
    return (
        <SC.headerBar>
            {
                props.left === "arrow"
                    ? <Ionicons name="arrow-back" size={24} color="gray" onPress={() => { props.navigation.goBack() }} />
                    : <View></View>
            }
            <SC.storeName>{props.title}</SC.storeName>
            {
                props.right === "magni"
                    ? <Entypo name="magnifying-glass" size={24} color="gray" />
                    : props.right === "heart"
                        ? <Ionicons name="heart-circle-sharp" size={24} color="red" />
                        : <View></View>
            }
        </SC.headerBar>
    )
}

export default HeaderBar;
