import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import Modal from "react-native-modal";
import styled, { css } from "styled-components/native";

const ReviewModal = ({ isVisible }) => {
  return (
    <Modal isVisible={isVisible}>
      <View>
        <TextInput placeholder="리뷰를 작성해 주세요."></TextInput>
      </View>
    </Modal>
  );
};

export default ReviewModal;
