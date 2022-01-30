import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Modal, Alert } from 'react-native';
import styled from 'styled-components/native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import ReviewWriteModal from '../ReviewWriteModal';
const SC = {
    modalBackground : styled.Pressable `
        flex: 1;
        background-color : rgba(0,0,0,0.3);
        justify-content: center;
        align-items: center;
    `,
    modalView: styled.View`
        position : absolute;
        top: 50%;
        left: 50%;
        margin-left: -100px;
        margin-top: auto;
        width : 200px;
        height : auto;
        justify-Content: center;
        align-Items: center;
        padding : 20px;
        border-radius : 10px;
        background-color : white;
        box-shadow: 0px 0px 2px rgba(0,0,0,0.36);
    `,
    optionTouch: styled.TouchableOpacity`
        padding: 5px;
        width: 100%;
        justify-Content: center;
        align-Items: center;
    `,
    optionText: styled.Text`
        font-family: 'Regular';
        font-size: 12px;
        color: black;
    `
}

const ReviewOptionModal = ({ setReload, isMyReview, modalVisible, setModalVisible, curLargeCat, curMidCat, curStore, defalutText, defaultRating }) => {

    const [modifiedModalVisible, setModifiedModalVisible] = useState(false); 

    useEffect(() => {
        if (!modifiedModalVisible) {
            setModalVisible(false)
        }
    }, [modifiedModalVisible])

    const url = useSelector((state) => state.url);
    axios.defaults.baseURL = url;
    const TOKEN_KEY = "@userKey";

    // const deleteAlert = () =>
    //     Alert.alert(
    //     "정말 삭제하시겠습니까?",
    //     [
    //         { 
    //             text: "아니오", 
    //             onPress: () => console.log("OK Pressed") 
    //         },
    //         {
    //             text: "예",
    //             onPress: () => console.log("Cancel Pressed"),
    //             style: "cancel"
    //         }
    //     ]
    // );


    const onDelete = async () => {
        let tokentoken;
        await AsyncStorage.getItem(TOKEN_KEY, (err, result) => {
            tokentoken = result;
        });
        axios
            .delete("/l-categories/" + curLargeCat + "/m-categories/" + curMidCat + "/stores/" + curStore + "/review",
            {
                headers :
                {
                    authorization : tokentoken 
                }
            })
            .then(function (res) {
                if (res.data.success) {
                    setReload(true);
                    setModalVisible(false);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const onReport = async () => {
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            transparent={true}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <SC.modalBackground style={{ flex:1 }} onPress={()=>setModalVisible(false)} />
            {
                isMyReview ? 
                <SC.modalView>
                    <SC.optionTouch onPress={() => {
                        setModifiedModalVisible(true);
                    }}>
                        <SC.optionText>
                            수정하기
                        </SC.optionText>
                    </SC.optionTouch>
                    <SC.optionTouch onPress={onDelete}>
                        <SC.optionText>
                            삭제하기
                        </SC.optionText>
                    </SC.optionTouch>
                    <SC.optionTouch onPress={()=>setModalVisible(false)}>
                        <SC.optionText>
                            취소
                        </SC.optionText>
                    </SC.optionTouch>
                    <ReviewWriteModal
                        setReload={setReload}
                        modalVisible={modifiedModalVisible}
                        setModalVisible={setModifiedModalVisible}
                        curLargeCat={curLargeCat}
                        curMidCat={curMidCat}
                        curStore={curStore}
                        defaultRating={defaultRating}
                        defalutText={defalutText}
                        isModified={true}
                    />
                </SC.modalView>
                :
                <SC.modalView>
                    <SC.optionTouch>
                        <SC.optionText>
                            신고하기
                        </SC.optionText>
                    </SC.optionTouch>
                    <SC.optionTouch onPress={()=>setModalVisible(false)}>
                        <SC.optionText>
                            취소
                        </SC.optionText>
                    </SC.optionTouch>
                </SC.modalView>
            }
        </Modal>
    )
}

export default ReviewOptionModal;