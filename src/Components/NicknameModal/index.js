import React, { useState, useEffect } from "react";
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
};

const NicknameModal = (props) => {
  const { modalVisible, setModalVisible, setOnchangeNickname } = props;

  const onSubmit = () => {
    setModalVisible((v) => !v);
    updateNickname(onChangeNickname);
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
            //value={onChangeNickname}
            onChangeText={(val) => setOnchangeNickname(val)}
            onSubmitEditing={() => onSubmit()}
            maxLength={15}
            placeholder="닉네임을 입력하세요"
            //color={mainColor}
          />
        </SC.modalView>
      </SC.container>
    </Modal>
  );
};

export default NicknameModal;
