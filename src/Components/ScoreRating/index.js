import React from 'react';
import { } from 'react-native';
import styled from 'styled-components/native'
import { Rating } from 'react-native-ratings';

const SC = {
    Container: styled.View`
        align-items: center;
    `,
    score: styled.Text`
        font-family: Bold;
        font-size: 42px;
    `
}

const ScoreRating = (props) => {
    return (
        <SC.Container>
            <SC.score>{props.score}</SC.score>
            <Rating
                readonly={true}
                imageSize={18}
                startingValue={props.score}
            />
        </SC.Container>
    )
}

export default ScoreRating;