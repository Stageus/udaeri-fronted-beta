import React, { useState, useEffect } from "react";
import {
    Platform,
    SafeAreaView,
    StatusBar,
    Dimensions
} from "react-native";
import styled, { css } from "styled-components/native";
import HeaderBar from "../../Components/HeaderBar";
import axios from "axios";
import { useSelector } from "react-redux";
import { MaterialIcons } from '@expo/vector-icons';

import RandomMenuModal from "../../Components/RandomMenuModal";
const { width, height } = Dimensions.get('window');

const StatusBarHeight = StatusBar.currentHeight;

const SC = {
    container: styled.View`
        background-color: #fff;
        flex : 1;
        ${Platform.OS === "android"
            ? css`
          padding-top: ${StatusBarHeight + 15}px;
        `
            : undefined}
    `,
    mainContainer: styled.View`
        flex: 1;
        background-color: ${props => props.bgColor};
    `,
    checkboxContainer: styled.TouchableOpacity`
        flex-Direction: row;
        align-items : center;
        padding: 10px;
        background-Color : ${props => props.color ? "rgba(255,153,51,0.35)" : "white"};
    `,
    catText: styled.Text`
        font-size : 20px;
        font-family : 'Regular';
        margin: 0 10px;
    `,
    submitContainer: styled.View`
        width: 100%;
        justify-content: center;
        align-items: center;
    `,
    submitBtn: styled.TouchableOpacity`
        width: 90%;
        height: 40px;
        background-color: ${props => props.color ? '#ff9933' : '#999999'};
        border-radius: 5px;
        justify-content: center;
        align-items: center;
    `,
    submitText: styled.Text`
        color : white;
        font-family: 'Regular';
        font-size: 16px;
    `,
}

const RandomMenu = ({ navigation }) => {
    const BGColor1 = useSelector((state) => state.BGColor1)
    const category = useSelector((state) => state.midCatList['먹거리'])
    const [catSelect, setCatSelect] = useState([]);
    const [pickedStore, setPickedStore] = useState({});
    const [isPossible, setIsPossible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        catSelect.length != 0 ? setIsPossible(true) : setIsPossible(false)
    }, [catSelect])

    const onSelected = (selected) => {
        catSelect.includes(selected) ?
            setCatSelect(catSelect.filter(item => item !== selected)) :
            setCatSelect([...catSelect, selected]);
    }

    const onSubmit = async () => {
        await axios
            .post("/categories/random/",
                {
                    categoryList: catSelect
                }
            )
            .then((res) => {
                if (res.data.success) {
                    setPickedStore(res.data.store)
                }
            })
            .catch((err) => {
                console.log("error");
                console.log(err);
            });
    }

    return (
        <SafeAreaView
            style={{
                backgroundColor: "#FFFFFF",
                flex: 1,
            }}
        >
            <SC.container>
                <HeaderBar
                    left="arrow"
                    title="메뉴 분류 선택"
                    navigation={navigation}>
                </HeaderBar>
                <SC.mainContainer bgColor={BGColor1}>
                    {
                        category && category.map((item, index) => (
                            <SC.checkboxContainer color={catSelect.find((ele) => ele === item)} onPress={() => onSelected(item)}>
                                {catSelect.find((ele) => ele === item) ?
                                    (<MaterialIcons name="check-box" size={20} color="#ff9933" />) :
                                    (<MaterialIcons name="check-box-outline-blank" size={20} color="#ff9933" />)
                                }
                                <SC.catText color={catSelect.find((ele) => ele === item)}>
                                    {item}
                                </SC.catText>
                            </SC.checkboxContainer>
                        ))
                    }
                </SC.mainContainer>
                <SC.submitContainer>
                    <SC.submitBtn
                        color={isPossible} 
                        onPress={() => {
                            if (isPossible) {
                                onSubmit();
                                setModalVisible(true);
                            }
                        }}>
                        <SC.submitText>메뉴 뽑기</SC.submitText>
                    </SC.submitBtn>
                </SC.submitContainer>
            </SC.container>

            <RandomMenuModal 
                navigation={navigation}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                pickedStore={pickedStore}
            />
        </SafeAreaView >

    )
}

export default RandomMenu;