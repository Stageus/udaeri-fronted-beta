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
import HeaderBar from "../../Components/HeaderBar";
import { loadTossPayments } from '@tosspayments/payment-sdk'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import SponsorSuccess from "./Success";
import SponsorFailure from "./Failure";
const { width, height } = Dimensions.get('window');
const StatusBarHeight = StatusBar.currentHeight;
const clientKey = 'test_ck_0Poxy1XQL8Rbx1a2WJY87nO5Wmlg'

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

const Sponsor = ({ navigation }) => {
    const TOKEN_KEY = "@userKey";
    const onSubmit = async () => {
        let tokentoken;
        await AsyncStorage.getItem(TOKEN_KEY, (err, result) => {
            tokentoken = result;
        });
        axios
            .post("/support",
                {
                    "orderId" : "TFMPcFoSzz2S-5yICJL44",
                    "paymentKey" : "5zJ4xY7m0kODnyRpQWGrNP0xmbDG03Kwv1M9ENjbeoPaZdL6",
                    "amount" : 15000
                }, {
                headers: {
                    authorization: tokentoken,
                    "Content-Type": "application/json",
                },
            })
            .then(function (res) {
                console.log(res.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const tossPay = async () => {
        const tossPayments = await loadTossPayments(clientKey);
        tossPayments.requestPayment('카드', {
          amount: 15000,
          orderId: 'TFMPcFoSzz2S-5yICJLDK',
          orderName: '토스 티셔츠 외 2건',
          customerName: '박토스',
          successUrl: SponsorSuccess,
          failUrl: SponsorFailure,
        })
      }

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
                <SC.keyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <SC.mainContainer>
                            <SC.tossBtn onPress={() => {
                                tossPay()
                            }}>

                            </SC.tossBtn>
                        </SC.mainContainer>
                    </TouchableWithoutFeedback>
                </SC.keyboardAvoidingView>

            </SC.container>
        </SafeAreaView >

    )
}

export default Sponsor;