import React, { useState, useEffect } from 'react';
import {  } from 'react-native';
import styled from 'styled-components/native'
import { Rating } from 'react-native-ratings';
import ReviewOptionModal from '../ReviewOptionModal';

const SC = {
    reviewWrap: styled.TouchableHighlight`
        margin: 10px;
        border-radius: 10px;
        border-width: ${(props) => props.isMyReview ? 1 : 0}px;
        border-color: ${(props) => props.isMyReview ? "#ff9933" : "rgba(0,0,0,0)"};
    `,
    container : styled.View`
        background-color: white;
        flex-Direction: row;
        justify-Content: space-between;
        padding: 20px;
        border-radius: 10px;
    `,
    leftWrap: styled.View`
        align-items:flex-start;
    `,
    nickname: styled.Text`
        font-family: Medium;
        font-size: 16px;
    `,
    content: styled.Text`
        margin-top: 10px;
        font-family: Regular;
        font-size: 14px;
    `,
    date: styled.Text`
        font-family: Light;
        font-size: 10px;
        color: gray;
    `,
    Modal: styled.Modal`
        
    `,
    modalBackground : styled.Pressable `
        flex: 1;
        background-color : rgba(0,0,0,0.3);
        justify-content: center;
        align-items: center;
    `,
    modalView: styled.View`
        position : absolute;
        top: 50%;
        left: 50%;
        margin-left: -100px;
        margin-top: auto;
        width : 200px;
        height : auto;
        justify-Content: center;
        align-Items: center;
        padding : 20px;
        border-radius : 10px;
        background-color : white;
        box-shadow: 0px 0px 2px rgba(0,0,0,0.36);
    `,
    optionTouch: styled.TouchableOpacity`
        padding: 5px;
        width: 100%;
        justify-Content: center;
        align-Items: center;
    `,
    optionText: styled.Text`
        font-family: 'Regular';
        font-size: 12px;
        color: black;
    `
}

const ReviewEle = (props) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <SC.reviewWrap isMyReview={props.isMyReview} onLongPress={() => setModalVisible(true)}>
            <SC.container>
                <SC.leftWrap>
                        <SC.nickname>{props.nickname}</SC.nickname>
                        <Rating
                            readonly={true}
                            imageSize={12}
                            startingValue={props.score}
                        />
                        <SC.content>{props.content}</SC.content>
                    </SC.leftWrap>
                    <SC.date>{props.date}</SC.date>
                    <ReviewOptionModal 
                        isMyReview={props.isMyReview} 
                        modalVisible={modalVisible} 
                        setModalVisible={setModalVisible}
                        curLargeCat={props.curLargeCat}
                        curMidCat={props.curMidCat}
                        curStore={props.curStore}
                        setReload={props.setReload}
                        defaultRating={props.score} 
                        defalutText={props.content}
                    />
            </SC.container>
        </SC.reviewWrap>
    )
}

export default ReviewEle;