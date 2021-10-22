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
const MiddleCatList = (props) => {
    return (
        <SC.Container onPress={() => {
            props.navigation.navigate('StoreList', { key: props.name });
        }}>
            <SC.left>
                <SC.thumbnail></SC.thumbnail>
                <SC.catTitle>{props.name}</SC.catTitle>
            </SC.left>
            <MaterialIcons name="arrow-forward-ios" size={12} color="gray" />
        </SC.Container>
    )
}
/*
const styles = StyleSheet.create({
    thumnail: {
        width: Dimensions.get('window').width * 0.05,
        height: Dimensions.get('window').width * 0.05,
        borderRadius: Dimensions.get('window').width * 0.05,
    }
})
*/

export default MiddleCatList
