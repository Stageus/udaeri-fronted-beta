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
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
    blankSpace: styled.View`
        width : ${width / 1.2}px;
        height: ${width / 1.5}px;
        background-color : #ffffff;
        padding: 20px;
        border-radius: 10px;
        border-color : #ff9933;
        border-width : 1px;
        margin-bottom : 20px;
    `,
    limitText: styled.Text`
        color : ${props => props.color ? "red" : "#888888"};
        font-family: 'Regular';
        font-size: 14px;
        justify-Content: flex-end;
        text-align: right;
    `,
    inputText: styled.TextInput`
        width: 100%;
        height: 80%;
        flex-Shrink : 1;
    `,
    submitBtn: styled.TouchableOpacity`
        width: ${width / 1.2}px;
        height: 40px;
        background-color: #ff9933;
        border-radius: 10px;
        justify-content: center;
        align-items: center;
    `,
    submitText: styled.Text`
        color : white;
        font-family: 'Regular';
        font-size: 16px;
    `,
    keyboardAvoidingView: styled.KeyboardAvoidingView`
        flex: 1;
    `
}

const Inquiry = ({ navigation }) => {
    const [inquiryText, setInquiryText] = useState("");
    const [maxText, setMaxText] = useState(false);
    useEffect(() => {
        if (inquiryText.length >= 500) {
            setMaxText(true);
        }
        else {
            setMaxText(false);
        }
    }, [inquiryText])
    const onSubmit = () => {

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
                    title="문의하기"
                    navigation={navigation}>
                </HeaderBar>
                <SC.keyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <SC.mainContainer>
                            <MaterialCommunityIcons name="account-question-outline" size={96} color="#ff9933" />
                            <SC.blankSpace>
                                <SC.inputText
                                    onChangeText={setInquiryText}
                                    value={inquiryText}
                                    placeholder={"문의 사항을 입력해주세요."}
                                    placeholderTextColor={'#C0C0C0'}
                                    maxLength={500}
                                    multiline={true}
                                >
                                </SC.inputText>
                                <SC.limitText color={maxText}>
                                    {inquiryText.length}/500
                                </SC.limitText>

                            </SC.blankSpace>

                            <SC.submitBtn
                                onPress={() => {
                                    if (inquiryText.length > 0 && inquiryText.length <= 500) {
                                        onSubmit()
                                    }
                                }}
                            >
                                <SC.submitText>문의 작성</SC.submitText>
                            </SC.submitBtn>
                        </SC.mainContainer>
                    </TouchableWithoutFeedback>
                </SC.keyboardAvoidingView>

            </SC.container>
        </SafeAreaView >

    )
}

export default Inquiry;