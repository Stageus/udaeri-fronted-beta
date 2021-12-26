import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import styled from "styled-components/native";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { jjimCheck, addJjim, deleteJjim } from "../../../reducer/index";

const SC = {
  headerBar: styled.View`
    height: 5%;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 20px;
    border-bottom-width: 1px;
    border-color: #d3d3d3;
  `,
  storeName: styled.Text`
    font-family: Bold;
    font-size: 24px;
  `,
};

const HeaderBar = (props) => {
  const dispatch = useDispatch();
  const url = useSelector((state) => state.url);
  axios.defaults.baseURL = url;

  const token = useSelector((state) => state.userToken);
  const jjimState = useSelector((state) => state.jjimState);

  const jjimList = useSelector((state) => state.jjimStore); // 유저가 찜한 가게 목록들

  const jjimToggle = (storeName) => {
    jjimState
      ? axios
          .delete("/users/favorites/", {
            headers: {
              "Content-Type": "application/json",
              authorization: token,
            },
            data: {
              store: storeName,
            },
          })
          .then((res) => {
            res.data.success
              ? (dispatch(jjimCheck(false)),
                dispatch(deleteJjim(storeName, jjimList)),
                console.log("삭제 성공"))
              : console.log("찜 삭제 실패");
          })
          .catch((err) => {
            connsole.log("찜 삭제 실패 이유: " + err);
          })
      : axios
          .post(
            "/users/favorites/",
            {
              store: storeName,
            },
            {
              headers: {
                "Content-Type": "application/json",
                authorization: token,
              },
            }
          )
          .then((res) => {
            res.data.success
              ? (dispatch(jjimCheck(true)),
                dispatch(addJjim(storeName, jjimList)),
                console.log("찜추가 성공"))
              : console.log("찜 추가 실패");
          })
          .catch((err) => {
            console.log("찜 추가 실패 이유: " + err);
          });
  };

  return (
    <SC.headerBar>
      {props.left === "arrow" ? (
        <Ionicons
          name="arrow-back"
          size={24}
          color="gray"
          onPress={() => {
            props.navigation.goBack();
          }}
        />
      ) : (
        <View></View>
      )}
      <SC.storeName>{props.title}</SC.storeName>
      {props.right === "magni" ? (
        <Entypo name="magnifying-glass" size={24} color="gray" />
      ) : props.right === "heart" ? (
        <Ionicons
          name="heart-circle-sharp"
          size={24}
          color={props.jjimState ? "red" : "gray"}
          onPress={() => jjimToggle(props.title)}
        />
      ) : (
        <></>
      )}
    </SC.headerBar>
  );
};

export default HeaderBar;
