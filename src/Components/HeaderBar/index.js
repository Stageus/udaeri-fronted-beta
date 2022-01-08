import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import styled from "styled-components/native";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jjimCheck, addJjim, deleteJjim } from "../../../reducer/index";

const SC = {
  headerBar: styled.View`
    // height: 5%;
    align-items: center;
    flex-direction: row;
    padding: 0 20px;
    padding-bottom: 5px;
    border-bottom-width: 1px;
    border-color: #d3d3d3;

    ${({ center }) => {
      return center === "true"
        ? `justify-content: center;`
        : `justify-content: space-between;`;
    }}
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

  const [token, setToken] = useState();
  const TOKEN_KEY = "@userKey";

  useEffect(() => {
    AsyncStorage.getItem(TOKEN_KEY, (err, token) => {
      setToken(token);
    });
  }, []);

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
                dispatch(deleteJjim(jjimList, storeName)),
                console.log("찜 삭제 성공"))
              : console.log(JSON.stringify(res.data) + "찜 삭제 실패");
          })
          .catch((err) => {
            console.log("찜 삭제 실패 이유: " + err);
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
                dispatch(addJjim(jjimList, storeName, res.data.l_category)),
                console.log("찜추가 성공"))
              : console.log("찜 추가 실패");
          })
          .catch((err) => {
            console.log("찜 추가 실패 이유: " + err);
          });
  };

  return (
    <SC.headerBar center={props.center}>
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
        <Entypo
          name="magnifying-glass"
          size={24}
          color="gray"
          onPress={() => props.navigation.navigate("Search")}
        />
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
