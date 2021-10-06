import React from 'react';
import styled from 'styled-components/native';

const SC = {
    Container: styled.View`
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    `,
    scoreNumber: styled.Text`  
        font-family: Regular;
        color : #808080;
        margin-right: 10px;
    `,
    scoreFilledBar: styled.View`
        width : ${props => (props.gauge / props.total * 30)}vw;
        height : 8px;
        background-color: #ff9933;
        margin-right: 10;
        border-radius: 15vw;
        position: absolute;
        left : 31.25px;
    `,
    scoreEmptyBar: styled.View`
        width : 30vw;
        height : 8px;
        background-color : #D3D3D3;
        margin-right: 10;
        border-radius: 15vw;
    `,
    totalNum: styled.Text`
        font-family: Light;
        color: #c0c0c0;
    `,
}

const ScoreSummary = (props) => {
    return (
        <SC.Container>
            <SC.scoreNumber>{5 - props.score}점</SC.scoreNumber>
            <SC.scoreEmptyBar></SC.scoreEmptyBar>
            <SC.scoreFilledBar gauge={props.nums} total={props.total}></SC.scoreFilledBar>
            <SC.totalNum>{props.nums}</SC.totalNum>
        </SC.Container>
    )
}

export default ScoreSummary;