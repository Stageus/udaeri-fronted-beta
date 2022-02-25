import React, { useState, useEffect, useRef } from "react";
import { useSelector,useDispatch } from "react-redux";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Modal, View, Text, Pressable, TextInput, Alert } from "react-native";
import styled from "styled-components/native";
import { restoreUserNickname  } from "../../../reducer/index";

const SC = {
  container: styled.Pressable`
    flex: 1;
    background-color: rgba(0, 0, 0, 0.3);
    justify-content: center;
    align-items: center;
  `,
  modalView: styled.View`
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -150px;
    margin-top: -100px;
    width: 300px;
    height: 200px;
    justify-content: center;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
    background-color: white;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.36);
  `,

  textInput: styled.TextInput`
    font-size: 16px;
    margin-bottom: 10px;
  `,

  changeBtn: styled.TouchableOpacity`
    width: 80px;
    height: 40px;
    background-color: ${(props) => props.mainColor};
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
  `,
  changeBtnText: styled.Text`
    font-size: 16px;
    font-weight: bold;
  `,

  btnsWrap: styled.View`
    flex-direction: row;
    width: 100%;
    //margin-top: 30px;
    justify-content: space-around;
    //background-color: red;
  `
};

const NicknameModal = (props) => {
  const {
    modalVisible,
    setModalVisible,
    setOnchangeNickname,
    token
  } = props;

  const dispatch = useDispatch();

  const mainColor = useSelector((state) => state.mainColor);
  const [newNickname, setNewNickname] = useState("");

  const TOKEN_KEY = "@userKey";
  const saveToken = async (token) => {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  };

  const updateNickname = (name) => {
    axios
      .put(
        "/users",
        {
          nickname: name,
        },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          saveToken(res.data.token); // 토큰 asyncstorage에 저장
          dispatch(restoreUserNickname(name)); // 닉네임 리덕스에 저장
        } else {
          console.log("false: ", res.data);
        }
      })
      .catch((err) => {
        console.log("닉네임 수정 에러: ", err);
      });
  };

  const onSubmit = () => {
    
    if (newNickname === "") {
      nicknameAlert()
    } else {
      updateNickname(newNickname);
      setOnchangeNickname(newNickname);
      setModalVisible(false);
    }
  };

  const onCancel = () => {
    setModalVisible(false);
  }

  const nicknameAlert = () => {
    alert("한 글자 이상의 닉네임을 입력해주세요.")
    // Alert.alert("안내", "한 글자 이상의 닉네임을 입력하세요." [
    //   {text: "확인", onPress: () => console.log('OK Pressed')}
    // ])
  }


  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible((v) => !v)}
    >
      <SC.container>
        <SC.modalView>
          <SC.textInput
            multiline={false}
            returnKeyType={"done"}
            value={newNickname}
            onChangeText={(val) => setNewNickname(val)}
            onSubmitEditing={() => onSubmit()}
            maxLength={15}
            placeholder="닉네임을 입력하세요"
          />
          <SC.btnsWrap>
            <SC.changeBtn mainColor={mainColor} onPress={() => onSubmit()}>
              <SC.changeBtnText>수정</SC.changeBtnText>
            </SC.changeBtn>
            <SC.changeBtn mainColor="gray" onPress={() => onCancel()}>
              <SC.changeBtnText>취소</SC.changeBtnText>
            </SC.changeBtn>
          </SC.btnsWrap>
          
        </SC.modalView>
      </SC.container>
    </Modal>
  );
};

export default NicknameModal;
