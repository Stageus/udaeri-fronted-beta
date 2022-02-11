import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { Dimensions, TouchableWithoutFeedback, Keyboard, Platform, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 

const { width, height } = Dimensions.get('window');

const SC = {
    Modal: styled.Modal`
        background-color : rgba(0,0,0,0.2);
    `,
    modalView: styled.View`
        flex: 1;
        width : ${width}px;
        height : ${height / 2}px;
        justify-Content: center;
        align-Items: center;
        padding : 20px;
        border-radius : 10px;
        background-color : white;
    `,
    largeText: styled.Text`
        font-size: 20px;
        font-family: 'Bold';
        color : ${props => props.color};
        margin : 10px 0px;
    `,
    smallText: styled.Text`
        font-size: 14px;
        text-align: center;
        font-family: 'Regular';
        color : ${props => props.color};
    `,
    closeBtn: styled.TouchableHighlight`
        width: ${width / 1.2}px;
        height: 40px;
        background-color: #ff9933;
        border-radius: 5px;
        justify-content: center;
        align-items: center;
        margin: 20px;
    `,
    closeText: styled.Text`
        color : white;
        font-family : 'Regular';
        font-size : 16px;
    `
}

const SuccessModal = ({ modalVisible, setModalVisible, navigation, contentText }) => {
    const mainColor = useSelector((state) => state.mainColor)
    const fontColor1 = useSelector((state) => state.fontColor1)
    const fontColor2 = useSelector((state) => state.fontColor2)

    return (
        <SC.Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            overlayBackground={'rgba(0, 0, 0, 0.75)'}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
            }}
        >
            <SC.modalView>
                <FontAwesome name="check-circle" size={100} color={mainColor} />
                <SC.largeText color={fontColor1}>
                    감사합니다!
                </SC.largeText>
                <SC.smallText color={fontColor2}>
                    {contentText}
                </SC.smallText>
                <SC.closeBtn onPress={() => {
                    navigation.goBack()
                    setModalVisible(false)
                }}>
                    <SC.closeText>
                        돌아가기
                    </SC.closeText>
                </SC.closeBtn>
            </SC.modalView>
        </SC.Modal>
    )
}

export default SuccessModal;

