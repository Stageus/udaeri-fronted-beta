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
import { useSelector, useDispatch } from "react-redux";
import { MaterialIcons } from '@expo/vector-icons';

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
    submitBtn: styled.TouchableOpacity`
        width: ${width / 1.2}px;
        height: 40px;
        background-color: #ff9933;
        border-radius: 10px;
        justify-content: center;
        align-items: center;
    `,
    submitText: styled.Text`
        color : white;
        font-family: 'Regular';
        font-size: 16px;
    `,
    Modal: styled.Modal`
        background-color : rgba(0,0,0,0.2);
    `,
    modalView: styled.View`
        flex: 1;
        width : ${width}px;
        height : ${height / 2}px;
        justify-Content: center;
        align-Items: center;
        padding : 20px;
        border-radius : 10px;
        background-color : white;
    `,
    submitBtn: styled.TouchableOpacity`
        width: ${width / 1.5}px;
        height: 40px;
        background-color: #ff9933;
        border-radius: 10px;
        justify-content: center;
        align-items: center;
    `,
    submitText: styled.Text`
        color : white;
        font-family: 'Regular';
        font-size: 16px;
    `,
    pickedStoreText: styled.Text`
        font-family : 'Bold';
        font-size : 20px;
    `
}

const RandomMenu = ({ navigation }) => {

    const category = useSelector((state) => state.midCatList['먹거리'])
    const [catSelect, setCatSelect] = useState([]);
    const [pickedStore, setPickedStore] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    console.log(pickedStore)
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
                <SC.mainContainer>
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
                <SC.submitBtn onPress={() => {
                    onSubmit();
                    setModalVisible(true);
                }}>
                    <SC.submitText>문의 작성</SC.submitText>
                </SC.submitBtn>
                <SC.Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <SC.modalView>
                        <SC.pickedStoreText>
                            {pickedStore.store}
                        </SC.pickedStoreText>
                        <SC.submitBtn
                            onPress={() => {
                                setModalVisible(!modalVisible)
                            }}
                        >
                            <SC.submitText>닫기</SC.submitText>
                        </SC.submitBtn>
                    </SC.modalView>
                </SC.Modal>
            </SC.container>
        </SafeAreaView >

    )
}

export default RandomMenu;