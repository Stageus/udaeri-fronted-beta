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
import { loadTossPayments } from '@tosspayments/payment-sdk'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Payments from "tosspayments-react-native";

const { width, height } = Dimensions.get('window');
const StatusBarHeight = StatusBar.currentHeight;
const clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq'

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
    tossBtn : styled.View`
        width: 100%;
        height: 100%;
        background-color: red;
    `,
    keyboardAvoidingView: styled.KeyboardAvoidingView`
    flex: 1;
    `
}

const Sponsor = ({ navigation }) => {
    
    const TOKEN_KEY = "@userKey";

    const onSubmit = async (data) => {
        let tokentoken;
        await AsyncStorage.getItem(TOKEN_KEY, (err, result) => {
            tokentoken = result;
        });
        axios
            .post("/support",
            {
                headers: {
                    authorization: tokentoken,
                    "Content-Type": "application/json",
                },
                body: { 
                    "orderId" : data.orderId,
                    "paymentKey" : data.paymentKey,
                    "amount" : data.amount 
                }
            })
            .then(function (res) {
                console.log(res.data)
            })
            .catch(function (error) {
                console.log(error);
            });
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
                <Payments
                    clientKey={clientKey}
                    orderId="TEST01010101010101"
                    orderName="테스트 주문"
                    amount={2000}
                    onSuccess={(data) => {
                        onSubmit(data)
                        Alert.alert("결제 성공", JSON.stringify(data))
                    }}
                    onError={(error) => Alert.alert("결제 실패", JSON.stringify(error))}
                />
            </SC.container>
        </SafeAreaView >

    )
}

export default Sponsor;