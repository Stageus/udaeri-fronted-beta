import React from 'react';
import styled, { css } from 'styled-components/native';
import { ScrollView } from 'react-native';
import HorizontalBarBtn from './HorizontalBarBtn'

const SC = {
    Container: styled.View`
        align-Content: center;
        border-Bottom-Width: 1px;
        border-Top-Width: 1px;
        border-Color: #D8DEDE;
        padding : 15px 0px;
    `,
    selectedCategory: styled.Text`
        margin : 0 15px;
        font-size: 18px;
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
                        : <HorizontalBarBtn category={item.category}></HorizontalBarBtn>
                ))}
            </ScrollView>
        </SC.Container>
    )
}

export default HorizontalBar