import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { Dimensions, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Foundation, FontAwesome } from '@expo/vector-icons';
import ReviewWriteModal from '../ReviewWriteModal';

import axios from "axios";

const { width, height } = Dimensions.get('window');

const SC = {
    Container: styled.View`
        flex :1;
        position : absolute;
    `,
    ReviewWriteBtn: styled.TouchableOpacity`
        position: absolute;
        top : ${height - (height / 3)}px;
        left : ${width - (width / 5)}px;
        width : ${width / 8}px;
        height : ${width / 8}px;
        background-Color: #ff9933;
        align-Items: center;
        justify-Content: center;
        border-Radius: ${height / 10}px;
    `,
}

const ReviewWriteBtn = (props) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <SC.Container>
            <SC.ReviewWriteBtn onPress={() => setModalVisible(true)}>
                <Foundation name="pencil" size={24} color="white" />
            </SC.ReviewWriteBtn>
            <ReviewWriteModal
                setReload={props.setReload}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                curLargeCat={props.curLargeCat}
                curMidCat={props.curMidCat}
                curStore={props.curStore}
                defalutText={""}
                defaultRating={0}
                isModified={false}
            />
        </SC.Container>
    )
}

export default ReviewWriteBtn;