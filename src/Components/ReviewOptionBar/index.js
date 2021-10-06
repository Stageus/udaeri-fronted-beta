import React from 'react';
import styled from 'styled-components/native';

const SC = {
    Container: styled.View`
        flex-Direction: row;
        justify-Content: space-between;
        align-Items: center;
        padding: 10px 20px;
        border-Bottom-Width: 1px;
        border-Bottom-Color: #d3d3d3;
    `,
    left: styled.View`
        flex-direction: row;
    `,
    reviewText: styled.Text`
        font-family: Light;
        color : gray;
    `,
    reviewNums: styled.Text`
        margin-left: 5px;
        font-family: Regular;
    `,
    right: styled.View`

    `,
}

const ReviewOptionBar = (props) => {
    return (
        <SC.Container>
            <SC.left>
                <SC.reviewText>리뷰</SC.reviewText>
                <SC.reviewNums>{props.reviewNums}개</SC.reviewNums>
            </SC.left>
            <SC.right>

            </SC.right>
        </SC.Container>
    )
}

export default ReviewOptionBar;