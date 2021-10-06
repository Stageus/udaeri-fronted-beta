import React from 'react';
import styled, { css } from 'styled-components/native';
import { ScrollView } from 'react-native';

const SC = {
    Container: styled.View`
        align-Content: center;
        border-Bottom-Width: 1px;
        border-Top-Width: 1px;
        border-Color: #D8DEDE;
        padding : 10px 0;
    `,
    category: styled.Text`
        margin : 0 15px;
        font-family : Regular;
        color : #808080;
    `,
    selectedCategory: styled.Text`
        margin : 0 15px;
        font-family : Bold;
        color : #ff9933;
    `
}

const HorizontalBar = (props) => {
    const catList = props.catList;
    const curCat = props.curCat;
    return (
        <SC.Container>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexDirection: 'row' }}>
                {catList.map((item) => (
                    item.category === curCat
                        ? <SC.selectedCategory>{item.category}</SC.selectedCategory>
                        : <SC.category>{item.category}</SC.category>
                ))}
            </ScrollView>
        </SC.Container>
    )
}

export default HorizontalBar