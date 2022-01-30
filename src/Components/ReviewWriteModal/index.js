import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { Dimensions, TouchableWithoutFeedback, Keyboard, Platform, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Foundation, FontAwesome } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';

import axios from "axios";

const { width, height } = Dimensions.get('window');

const SC = {
    Modal: styled.Modal`
        background-color : rgba(0,0,0,0.2);
    `,
    modalView: styled.View`
        flex: 1;
        width : ${width}px;
        height : ${height / 2}px;
        justify-Content: center;
        align-Items: center;
        padding : 20px;
        border-radius : 10px;
        background-color : white;
    `,
    blankSpace: styled.View`
        width : ${width / 1.5}px;
        height: ${width / 2}px;
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
        height: 70%;
        flex-Shrink : 1;
    `,
    submitBtn: styled.TouchableOpacity`
        width: ${width / 1.5}px;
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
    closeBtn: styled.TouchableOpacity`
        position: absolute;
        top : ${height / 12}px;
        left : ${width / 15}px;
    `,
    keyboardAvoidingView: styled.KeyboardAvoidingView`
        flex: 1;
    `
}

const ReviewWriteModal = ({ setReload, modalVisible, setModalVisible, curLargeCat, curMidCat, curStore, defalutText, defaultRating, isModified }) => {
    const [reviewText, setreviewText] = useState(defalutText);
    const [maxText, setMaxText] = useState(false);
    const [rating, setRarting] = useState(defaultRating);
    useEffect(() => {
        if (reviewText.length >= 20) {
            setMaxText(true);
        }
        else {
            setMaxText(false);
        }
    }, [reviewText])

    const url = useSelector((state) => state.url);
    axios.defaults.baseURL = url;
    const TOKEN_KEY = "@userKey";
    
    const onSubmit = async () => {
        let tokentoken;
        await AsyncStorage.getItem(TOKEN_KEY, (err, result) => {
            tokentoken = result;
        });
        isModified ? 
        axios
            .put("/l-categories/" + curLargeCat + "/m-categories/" + curMidCat + "/stores/" + curStore + "/review",
                {
                    review: reviewText,
                    star_rating: rating
                }, {
                headers: {
                    authorization: tokentoken,
                    "Content-Type": "application/json",
                },
            })
            .then(function (res) {
                if (res.data.success) {
                    setReload(true);
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        :
        axios
            .post("/l-categories/" + curLargeCat + "/m-categories/" + curMidCat + "/stores/" + curStore + "/review",
                {
                    review: reviewText,
                    star_rating: rating
                }, {
                headers: {
                    authorization: tokentoken,
                    "Content-Type": "application/json",
                },
            })
            .then(function (res) {
                if (res.data.success) {
                    setReload(true);
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    };

    const ratingCompleted = (rating) => {
        setRarting(rating);
    }

    return (
        <SC.Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            overlayBackground={'rgba(0, 0, 0, 0.75)'}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
            }}
        >
            <SC.keyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                    <SC.modalView>
                        <Rating
                            style={{ paddingVertical: 10 }}
                            imageSize={30}
                            startingValue={rating}
                            onFinishRating={ratingCompleted}
                            minValue={1}
                        />
                        <SC.blankSpace>
                            <SC.inputText
                                onChangeText={setreviewText}
                                value={reviewText}
                                placeholder={"리뷰를 입력해주세요."}
                                placeholderTextColor={'#C0C0C0'}
                                maxLength={20}
                                multiline={true}
                            >
                            </SC.inputText>
                            <SC.limitText color={maxText}>
                                {reviewText.length}/20
                            </SC.limitText>
                        </SC.blankSpace>

                        <SC.submitBtn
                            onPress={() => {
                                if (reviewText.length > 0 && reviewText.length <= 20 && rating != 0) {
                                    onSubmit()
                                    setModalVisible(!modalVisible)
                                } 
                            }}
                        >
                            <SC.submitText>리뷰 작성</SC.submitText>
                        </SC.submitBtn>
                        <SC.closeBtn onPress={() => setModalVisible(false)}>
                            <FontAwesome name="close" size={20} color="gray" />
                        </SC.closeBtn>
                    </SC.modalView>
                </TouchableWithoutFeedback>
            </SC.keyboardAvoidingView>
        </SC.Modal>
    )
}

export default ReviewWriteModal;

