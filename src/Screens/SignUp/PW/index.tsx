import React, { useState, useEffect } from 'react';
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
        align-items: center;
        padding : 20px;
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

const SignUpPW = ({ navigation }: any) => {
    const [PWValue, setPWValue] = useState("");
    const [PWOKValue, setPWOKValue] = useState("");
    const [active, setActive] = useState(false);

    const isPassword = (asValue: string) => {
        var regExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
        // 8 ~ 16자 영문, 숫자, 특수문자를 최소 한가지씩 조합
        return regExp.test(asValue);
    }

    useEffect(() => {
        isPassword(PWValue) ?
            (PWValue === PWOKValue) ?
                setActive(true) : setActive(false)
            : setActive(false);
    })
    return (
        <SafeAreaView style={{ backgroundColor: '#ffffff' }}>
            <HeaderBar left="arrow" title="회원가입" navigation={navigation}> </HeaderBar>
            <SC.container>
                <SC.form>
                    <SC.text>비밀번호</SC.text>
                    <SignUpInputForm placeHolder="비밀번호를 입력해주세요." type="pw" value={PWValue} getValue={setPWValue}></SignUpInputForm>
                    <SignUpInputForm placeHolder="비밀번호를 한번 더 입력해주세요." type="pw" value={PWOKValue} getValue={setPWOKValue}></SignUpInputForm>
                </SC.form>
                <SC.nextBtn>
                    <LongBarBtn text="다음" navigation={navigation} nextPage="SignUpNickname" active={active}></LongBarBtn>
                </SC.nextBtn>
            </SC.container>
        </SafeAreaView>
    )
}

export default SignUpPW;