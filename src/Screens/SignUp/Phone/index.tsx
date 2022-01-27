import React from 'react';
import { Dimensions, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import styled from 'styled-components/native';

import HeaderBar from '../../../Components/HeaderBar';
import SignUpInputForm from '../../../Components/SignUpInputForm';
import LongBarBtn from '../../../Components/LongBarBtn';

const { width, height } = Dimensions.get('window');

const SC = {
    container: styled.View`
        display : flex;
        height : ${height}px;
        padding : 30px;
        align-items: center;
        background-color : white;
    `,
    form: styled.View`
        
    `,
    text: styled.Text`
        font-family: 'Bold';
        font-size : 16px;
        color : #333333;
        margin-bottom: 10px;
    `,
    nextBtn: styled.View`
        display: flex;
        align-items: center;
        position : absolute;
        top : ${height * 0.8}px;
    `
}

const SignUpPhone = ({ navigation }: any) => {
    return (
        <SafeAreaView style={{ backgroundColor: '#ffffff' }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <HeaderBar left="arrow" title="회원가입" navigation={navigation}> </HeaderBar>
                <SC.container>
                    <SC.form>
                        <SC.text>전화번호</SC.text>
                        <SignUpInputForm placeHolder="01012341234" type="phone"></SignUpInputForm>
                    </SC.form>
                    <SC.nextBtn>
                        <LongBarBtn text="완료" navigation={navigation} nextPage="Home"></LongBarBtn>
                    </SC.nextBtn>
                </SC.container>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default SignUpPhone;