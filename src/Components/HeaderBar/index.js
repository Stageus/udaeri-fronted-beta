import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import styled from 'styled-components/native';

const SC = {
    headerBar: styled.View`
        flex: 0.7;
        align-items: center;
        flex-direction: row;
        justify-content: space-between;
        padding : 0 20px;
    `,
    storeName: styled.Text`
        font-family: Bold;
        font-size: 16px;
    `,
}

const HeaderBar = (props) => {
    return (
        <SC.headerBar>
            {
                props.left == "arrow"
                    ? <Ionicons name="arrow-back" size={24} color="gray" />
                    : <View></View>
            }
            <SC.storeName>{props.title}</SC.storeName>
            {
                props.right == "magni"
                    ? <Entypo name="magnifying-glass" size={24} color="gray" />
                    : props.right == "heart"
                        ? <Ionicons name="heart-circle-sharp" size={24} color="red" />
                        : null
            }
        </SC.headerBar>
    )
}

export default HeaderBar;
