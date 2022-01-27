import React, { useState, useEffect } from 'react';
import { Dimensions, SafeAreaView } from 'react-native';
import styled from 'styled-components/native';

import HeaderBar from '../../../Components/HeaderBar';
import SignUpInputForm from '../../../Components/SignUpInputForm';
import NextBtn from '../../../Components/NextBtn';

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
        font-family: 'Medium';
        font-size : 14px;
        color : #888888;
        margin-bottom: 10px;
    `,
    nextBtn: styled.View`
        display: flex;
        align-items: center;
    `
}

const SignUpID = ({ navigation }: any) => {

    const [IDValue, setIDValue] = useState("");
    const [active, setActive] = useState(false);

    const isId = (asValue: string) => {
        var regExp = /^[a-z]+[a-z0-9]{5,19}$/g;
        // 영문자로 시작하는 영문자 또는 숫자 6~20자 
        return regExp.test(asValue);
    }

    useEffect(() => {
        isId(IDValue) ? setActive(true) : setActive(false);
    })

    return (
        <SafeAreaView style={{ backgroundColor: '#ffffff' }}>
            <HeaderBar left="arrow" title="회원가입" navigation={navigation}> </HeaderBar>
            <SC.container>
                <SC.form>
                    <SC.text>아이디</SC.text>
                    <SignUpInputForm placeHolder="아이디를 입력해주세요." type="text" value={IDValue} getValue={setIDValue}></SignUpInputForm>
                </SC.form>
                <SC.nextBtn>
                    <NextBtn text="다음" navigation={navigation} nextPage="SignUpPW" active={active}></NextBtn>
                </SC.nextBtn>
            </SC.container>
        </SafeAreaView>
    )
}

export default SignUpID;