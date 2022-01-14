import React, { useState } from "react";
import {
    Platform,
    SafeAreaView,
    StatusBar,
} from "react-native";
import styled, { css } from "styled-components/native";
import { useSelector, useDispatch } from "react-redux";
import HeaderBar from "../../Components/HeaderBar";

const StatusBarHeight = StatusBar.currentHeight;

const SC = {
    container: styled.View`
        background-color: #fff;
        ${Platform.OS === "android"
            ? css`
          padding-top: ${StatusBarHeight + 15}px;
        `
            : undefined}
    `
}

const Inquiry = ({ navigation }) => {
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
                    title="문의하기"
                    navigation={navigation}>
                </HeaderBar>
            </SC.container>
        </SafeAreaView>

    )
}

export default Inquiry