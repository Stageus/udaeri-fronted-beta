import React from 'react';
import styled from 'styled-components/native';
import { Dimensions, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
EStyleSheet.build();
const { width, height } = Dimensions.get('window');

const SC = {
    Container: styled.View`
        flex-direction: row;
        align-items: center;
    `,
    scoreNumber: styled.Text`  
        font-family: Regular;
        color : #808080;
        margin-right: 10px;
        font-size: 14px;
    `,
    scoreFilledBar: styled.View`
        width : ${props => (props.total ? (props.gauge / props.total) * (width / 3) : 0)}px;
        height : 8px;
        background-color: #ff9933;
        margin-right: 5px;
        border-radius: 15px;
        position: absolute;
    `,
    scoreEmptyBar: styled.View`
        width : ${width / 3}px;
        height : 8px;
        background-color : #D3D3D3;
        margin-right: 5px;
        border-radius: 15px;
    `,
    totalNum: styled.Text`
        font-size: 14px;
        font-family: Regular;
        color: #c0c0c0;
    `,
}

const ScoreSummary = (props) => {
    console.log("props.nums : ", props.nums);
    console.log("props.total : ", props.total);
    return (
        <SC.Container>
            <SC.scoreNumber>{5 - props.score}점</SC.scoreNumber>
            <View>
                <SC.scoreEmptyBar></SC.scoreEmptyBar>
                <SC.scoreFilledBar gauge={props.nums} total={props.total}></SC.scoreFilledBar>
            </View>
            <SC.totalNum>{props.nums}</SC.totalNum>
        </SC.Container>
    )
}

export default ScoreSummary;