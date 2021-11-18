import React from 'react';
import { Dimensions, SafeAreaView } from 'react-native';
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

const SignUpNickname = ({ navigation }: any) => {
    return (
        <SafeAreaView style={{ backgroundColor: '#ffffff' }}>
            <HeaderBar left="arrow" title="회원가입" navigation={navigation}> </HeaderBar>
            <SC.container>
                <SC.form>
                    <SC.text>닉네임</SC.text>
                    <SignUpInputForm placeHolder="닉네임를 입력해주세요." type="text"></SignUpInputForm>
                </SC.form>
                <SC.nextBtn>
                    <LongBarBtn text="다음" navigation={navigation} nextPage="SignUpPhone"></LongBarBtn>
                </SC.nextBtn>
            </SC.container>
        </SafeAreaView>
    )
}

export default SignUpNickname;