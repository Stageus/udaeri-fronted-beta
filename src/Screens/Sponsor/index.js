import React, { useState, useEffect } from "react";
import {
    Platform,
    SafeAreaView,
    StatusBar,
    Dimensions,
    Alert
} from "react-native";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components/native";
import HeaderBar from "../../Components/HeaderBar";
import TossPayment from "../../Components/TossPayment";
const { width, height } = Dimensions.get('window');
const StatusBarHeight = StatusBar.currentHeight;

const SC = {
    container: styled.View`
        background-color: #fff;
        flex : 1;
        ${Platform.OS === "android"
            ? css`
          padding-top: ${StatusBarHeight + 15}px;
        `
            : undefined}
    `,
    mainContainer: styled.View`
        flex : 1;
        justify-content : center;
        align-items : center;
    `,
    Text: styled.Text`
        font-family: 'Bold';
        font-size: 20px;
    `,
    paymentBtn : styled.TouchableOpacity`
        width: ${width / 1.2}px;
        height: 40px;
        background-color: #ff9933;
        border-radius: 5px;
        justify-content: center;
        align-items: center;
        margin: 20px;
    `,
    paymentBtnText: styled.Text`
        color : white;
        font-family : 'Medium';
        font-size : 16px;
    `
}

const Sponsor = ({ navigation }) => {
    
    const TOKEN_KEY = "@userKey";
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <SafeAreaView
            style={{
                backgroundColor: "#FFFFFF",
                flex: 1,
            }}
        >
            <SC.container>
                <HeaderBar
                    left="arrow"
                    title="후원하기"
                    navigation={navigation}>
                </HeaderBar>
                <SC.mainContainer>
                    <SC.Text>
                        후원의 혜택
                    </SC.Text>
                    <SC.paymentBtn onPress={() => setModalVisible(true)}>
                        <SC.paymentBtnText>
                            후원하기
                        </SC.paymentBtnText>
                    </SC.paymentBtn>
                </SC.mainContainer>
                <TossPayment 
                    navigation={navigation}
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                />
            </SC.container>
        </SafeAreaView >

    )
}

export default Sponsor;