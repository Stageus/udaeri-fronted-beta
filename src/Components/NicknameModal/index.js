import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { Modal, View, Text, Pressable, TextInput } from "react-native";
import styled from "styled-components/native";

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
};

const NicknameModal = (props) => {
  const {
    modalVisible,
    setModalVisible,
    onChangeNickname,
    setOnchangeNickname,
    updateNickname,
  } = props;

  const mainColor = useSelector((state) => state.mainColor);
  const [newNickname, setNewNickname] = useState("");

  const onSubmit = () => {
    setModalVisible(false);
    updateNickname(newNickname);
    setOnchangeNickname(newNickname);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible((v) => !v)}
    >
      <SC.container>
        <SC.modalView>
          <TextInput
            multiline={false}
            returnKeyType={"done"}
            value={newNickname}
            onChangeText={(val) => setNewNickname(val)}
            onSubmitEditing={() => onSubmit()}
            maxLength={15}
            placeholder="닉네임을 입력하세요"
          />
          <SC.changeBtn mainColor={mainColor} onPress={() => onSubmit()}>
            <SC.changeBtnText>수정</SC.changeBtnText>
          </SC.changeBtn>
        </SC.modalView>
      </SC.container>
    </Modal>
  );
};

export default NicknameModal;
