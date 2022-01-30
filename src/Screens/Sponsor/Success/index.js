import React, { useState, useEffect } from "react";
import {
    Platform,
    SafeAreaView,
    StatusBar,
    Dimensions,
    TouchableWithoutFeedback,
    Keyboard
} from "react-native";
import styled, { css } from "styled-components/native";
import HeaderBar from "../../../Components/HeaderBar";
import { loadTossPayments } from '@tosspayments/payment-sdk'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

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
        height:auto;
        flex : 1;
        justify-content : center;
        align-items : center;
    `,
    tossBtn : styled.TouchableOpacity`
        width: 100px;
        height: 100px;
        background-color: red;
    `,
    keyboardAvoidingView: styled.KeyboardAvoidingView`
    flex: 1;
    `
}

const SponsorSuccess = ({ navigation }) => {
    

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
                        
                    </SC.mainContainer>

            </SC.container>
        </SafeAreaView >

    )
}

export default SponsorSuccess;