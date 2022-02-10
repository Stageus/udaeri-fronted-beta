import React, { useState, useEffect } from "react";
import {
    Platform,
    SafeAreaView,
    StatusBar,
    Dimensions,
    TouchableWithoutFeedback,
    Keyboard
} from "react-native";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components/native";
import HeaderBar from "../../Components/HeaderBar";
import SuccessModal from "../../Components/SuccessModal"
import axios from "axios";

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
    inquiryCatContainer : styled.View`
        flex-Direction: row;
        flex-wrap : wrap;
    `,
    inquiryCatBox : styled.TouchableOpacity`
        align-items : center;
        justify-content: center;
        padding: 3px;
        border-radius: 2px;
        margin : 2.5px 5px 2.5px 0px;
        background-Color : ${props => props.color ? "#ff9933" : "#999999"};
    `,
    catText: styled.Text`
        font-size : 16px;
        font-family : 'Regular';
        color : white;
    `,
    topText : styled.Text`
        font-family : 'Bold';
        font-size : 16px;
        color : ${props => props.color};
        margin: 5px 0px;
    `,
    inquiryTitleInputText : styled.TextInput`
        width: 100%;
        height: 80%;
        flex-Shrink : 1;
    `,
    inquiryContentContainer : styled.View`
        width : ${width / 1.2}px;
    `,
    blankEmailSpace: styled.View`
        height : 60px;
        background-color : #ffffff;
        padding: 20px;
        border-radius: 5px;
        border-color : ${props => props.borderColor ? "#ff9933" : "#999999"};
        border-width : 1px;
        justify-content:center;
    `,
    blankContentSpace: styled.View`
        height: ${width / 2}px;
        background-color : #ffffff;
        padding: 20px;
        border-radius: 5px;
        border-color : ${props => props.borderColor ? "#999999" : "#ff9933"};
        border-width : 1px;
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
        background-color: ${props => props.bgColor ? "#ff9933" : "#999999"};
        border-radius: 5px;
        justify-content: center;
        align-items: center;
        margin-top : 20px;
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
    const fontColor1 = useSelector((state) => state.fontColor1)
    const [catSelect, setCatSelect] = useState([]);
    const category = [
        '기능 요청',
        '버그 신고',
        '계정 문의',
        '안녕하세요',
        '저는',
        '양효준',
        '입니다.',
        '기타'
    ]

    const onSelected = (selected) => {
        catSelect.includes(selected) ?
            setCatSelect(catSelect.filter(item => item !== selected)) :
            setCatSelect([selected]);
    }

    
    const [inquiryText, setInquiryText] = useState("");
    const [emailText, setEmailText] = useState("");
    const [isEmail, setIsEmail] = useState(false);
    const [maxText, setMaxText] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => { // 이메일 정규식
        setIsEmail(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(emailText)); 
    }, [emailText])

    useEffect(() => {
        if (inquiryText.length >= 500 || inquiryText.length == 0) {
            setMaxText(true);
        }
        else {
            setMaxText(false);
        }
    }, [inquiryText])
    const onSubmit = async () => {
        await axios
            .post("/user/opinion",
                {
                    contact : emailText,
                    opinion : inquiryText,
                    opinionCategory : catSelect[0]
                }
            )
            .then(function (res) {
                if(res.data.success) {
                    setModalVisible(true)
                    console.log(res.data.success)
                }
            })
            .catch(function (error) {
                console.log(error);
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
                    title="문의하기"
                    navigation={navigation}>
                </HeaderBar>
                <SC.keyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <SC.mainContainer>
                            <SC.inquiryContentContainer>
                                <SC.topText color={fontColor1}>
                                    문의 유형
                                </SC.topText>
                                <SC.inquiryCatContainer>
                                {
                                    category && category.map((item, index) => (
                                        <SC.inquiryCatBox color={catSelect.find((ele) => ele === item)} onPress={() => onSelected(item)}>
                                            <SC.catText color={catSelect.find((ele) => ele === item)}>
                                                {item}
                                            </SC.catText>
                                        </SC.inquiryCatBox>
                                    ))
                                }
                                </SC.inquiryCatContainer>
                                <SC.topText color={fontColor1}>
                                    이메일
                                </SC.topText>
                                <SC.blankEmailSpace borderColor={isEmail}>
                                    <SC.inputText
                                        onChangeText={setEmailText}
                                        value={emailText}
                                        placeholder={"답변을 받으실 이메일을 입력해주세요."}
                                        placeholderTextColor={'#C0C0C0'}
                                    >
                                    </SC.inputText>
                                </SC.blankEmailSpace>
                                <SC.topText color={fontColor1}>
                                    문의 내용
                                </SC.topText>
                                <SC.blankContentSpace borderColor={maxText}>
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
                                </SC.blankContentSpace>
                            </SC.inquiryContentContainer>
                            

                            <SC.submitBtn
                                onPress={() => {
                                    if (!maxText && isEmail && catSelect.length == 1) {
                                        onSubmit()
                                    }
                                }}
                                bgColor = {!maxText && isEmail && catSelect.length == 1}
                            >
                                <SC.submitText>문의 제출</SC.submitText>
                            </SC.submitBtn>
                        </SC.mainContainer>
                    </TouchableWithoutFeedback>
                </SC.keyboardAvoidingView >
                <SuccessModal
                    navigation={navigation}
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    contentText="빠르게 처리하여 답변드리도록 하겠습니다."
                />
            </SC.container>
        </SafeAreaView >

    )
}

export default Inquiry;