import React, { useState } from "react";
import {} from "react-native";
import styled, { css } from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { restoreToken, checkToken } from "../../../reducer/index";
import { MaterialIcons } from "@expo/vector-icons";

import { loadTossPayments } from '@tosspayments/payment-sdk'



const SC = {
  MyPageListWrap: styled.View`
    border-bottom-width: 1px;
    border-color: #d3d3d3;
  `,
  MyPageListEle: styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
  `,
  MyPageListText: styled.Text`
    font-size: 16px;
  `,
};

const MyPageEle = (props) => {
  const dispatch = useDispatch();

  const TOKEN_KEY = "@userKey";
  const tokenExpire = () => {
    AsyncStorage.removeItem(TOKEN_KEY);
    dispatch(checkToken(false));
  };

  const GrayColor = useSelector((state) => state.grayColor);
  
  const tossPay = async () => {
    const clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq'
    const tossPayments = await loadTossPayments(clientKey);
    tossPayments.requestPayment('카드', {
      amount: 15000,
      orderId: 'W-zFTtRywj6DFeoCC-SRy',
      orderName: '토스 티셔츠 외 2건',
      customerName: '박토스',
      successUrl: 'http://localhost:8080/success',
      failUrl: 'http://localhost:8080/fail',
    })
  }
  
  return (
    <SC.MyPageListWrap>
      <SC.MyPageListEle
        // 스위치문으로 바꾸는게 좋을 듯
        onPress={() => {
          if (props.title === "로그아웃") {
            tokenExpire();
          } else if (props.page === "Sponsor") {
            tossPay();
          } else {
            props.navigation.navigate(props.page);
          }
        }}
      >
        <SC.MyPageListText>{props.title}</SC.MyPageListText>
        <MaterialIcons name="arrow-forward-ios" size={13} color={GrayColor} />
      </SC.MyPageListEle>
    </SC.MyPageListWrap>
  );
};

export default MyPageEle;
