import React, { useState, useEffect } from "react";
import {
    Dimensions,
    Alert,
    StatusBar
} from "react-native";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Payments from "tosspayments-react-native"
import SuccessModal from "../SuccessModal"

const { width, height } = Dimensions.get('window');
const StatusBarHeight = StatusBar.currentHeight;
const clientKey = 'test_ck_0Poxy1XQL8Rbx1a2WJY87nO5Wmlg'

const SC = {
    Modal: styled.Modal`
        background-color : rgba(0,0,0,0.2);
    `,
    View: styled.View`
        margin : ${StatusBarHeight + 20}px;
    `,
    Text: styled.Text`
        
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

const TossPayment = ({ modalVisible, setModalVisible, navigation }) => {

    const [modalVisible2, setModalVisible2] = useState(false);
    const [userID, setUserID] = useState("");


    const TOKEN_KEY = "@userKey";
    


    useEffect(async () => {
        let tokentoken;
        await AsyncStorage.getItem(TOKEN_KEY, (err, result) => {
            tokentoken = result;
        });

        axios
            .get("/users", {
                headers: {
                  authorization: tokentoken,
                },
              })
              .then((res) => {
                setUserID(res.data.id)
              })
              .catch((err) => console.log("회원 정보 못 받아옴", err));
    }, [])

    const onSubmit = async (data) => {
        await axios
            .post("/support/",
            {   
                orderId : data.orderId,
                paymentKey : data.paymentKey,
                amount : data.amount
            }, {
                headers: {
                    authorization: tokentoken,
                    "Content-Type": "application/json",
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
            <SC.Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            overlayBackground={'rgba(0, 0, 0, 0.75)'}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
            }}
            >
                <SC.View>

                </SC.View>
                    <Payments
                        clientKey={clientKey}
                        orderId={userID}
                        orderName="테스트 주문"
                        amount={2000}
                        onSuccess={(data) => {
                            onSubmit(data)
                            setModalVisible2(true)
                        }}
                        onError={() => {
                            Alert.alert("후원 결제를 취소하셨습니다!");
                            navigation.goBack()
                        }}
                    />
                    <SuccessModal
                        navigation={navigation}
                        modalVisible={modalVisible2}
                        setModalVisible={setModalVisible2}
                        contentText="우대리의 프리미엄 혜택을 누려보세요."
                    />
            </SC.Modal >

    )
}

export default TossPayment;