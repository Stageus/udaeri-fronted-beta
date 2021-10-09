import React from 'react';
import { } from 'react-native';
import styled from 'styled-components/native'
import { Rating } from 'react-native-ratings';

const SC = {
    reviewWrap: styled.View`
        flex-Direction: row;
        justify-Content: space-between;
        padding: 20px;
        border-Bottom-Width: 1px;
        border-Bottom-Color: gray;
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
    `
}

const ReviewEle = (props) => {
    return (
        <SC.reviewWrap>
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
        </SC.reviewWrap>
    )
}

export default ReviewEle;