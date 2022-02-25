import React, { useState, useEffect } from "react";
import {
    StatusBar,
    Dimensions
} from "react-native";
import styled, { css } from "styled-components/native";
import { useSelector, useDispatch } from "react-redux";
import { restoreCurStore } from '../../../reducer/index';


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
    submitBtn: styled.TouchableOpacity`
        width: ${width * 0.8};
        height: 40px;
        background-color: #ff9933;
        border-radius: 5px;
        justify-content: center;
        align-items: center;
    `,
    submitText: styled.Text`
        color : white;
        font-family: 'Regular';
        font-size: 16px;
    `,
    pickedStoreTouch: styled.TouchableHighlight`
        margin: 10px;
        border-radius: 10px;
    `,
    pickedStoreView: styled.View`
        background-color: ${props => props.bgColor};
        width: ${width * 0.8}px;
        height: ${height / 5}px;
        border-radius: 5px;
        justify-content:center;
        align-items: center;
    `,
    pickedStoreText1: styled.Text`
        font-family : 'Regular';
        font-size : 12px;
    `,
    pickedStoreText2: styled.Text`
    font-family : 'Bold';
    font-size : 20px;
    `,
    pickedStoreText3: styled.Text`
        font-family : 'Medium';
        font-size : 16px;
    `
}

const RandomMenuModal = ({ navigation, modalVisible, setModalVisible, pickedStore }) => {
    const dispatch = useDispatch();
    const bgColor = useSelector((state) => state.lineColor3)
    return (
            <SC.Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                <SC.modalView>
                    <SC.pickedStoreTouch onPress={() => {
                        navigation.navigate('StorePage', { key: pickedStore.store });
                        dispatch(restoreCurStore(pickedStore.store));
                        setModalVisible(!modalVisible);
                    }}>
                        <SC.pickedStoreView bgColor={bgColor}>
                            <SC.pickedStoreText1>
                                {pickedStore.category}
                            </SC.pickedStoreText1>
                            <SC.pickedStoreText2>
                                {pickedStore.store}
                            </SC.pickedStoreText2>
                            <SC.pickedStoreText3>
                                {pickedStore.main_menu}
                            </SC.pickedStoreText3>
                        </SC.pickedStoreView>
                    </SC.pickedStoreTouch>
                    <SC.submitBtn
                        onPress={() => {
                            setModalVisible(!modalVisible)
                        }}
                    >
                        <SC.submitText>다시 뽑기</SC.submitText>
                    </SC.submitBtn>
                </SC.modalView>
            </SC.Modal>
    )
}

export default RandomMenuModal;