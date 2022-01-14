import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  StatusBar,
  ScrollView,
  Dimensions,
  TextInput,
  SafeAreaView,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

// import SaveSearchEle from "../../Components/Search/SaveSearchEle";
// import SearchResultEle from "../../Components/Search/SearchResultEle";
import StoreEle from "../../../Components/StoreEle";

const StatusBarHeight = StatusBar.currentHeight;
const { width, height } = Dimensions.get("window");

const SC = {
  Container: styled.View`
    background-color: #fff;

    ${Platform.OS === "android"
      ? css`
          padding-top: ${StatusBarHeight + 5}px;
        `
      : undefined}
  `,
  Top: styled.View`
    height: ${height * 0.07}px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px 10px 10px;
    border-bottom-width: 1px;
    border-bottom-color: #999999;
    position: relative;
    // background-color: yellow;
  `,
  SearchInput: styled.TextInput`
    // background-color: #ebedef;
    background-color: #fff;
    border-radius: 5px;
    width: 85%;
    padding: 5px 30px 5px 15px;
  `,
  ClearBtn: styled.TouchableOpacity`
    // position: absolute;
    // right: 15px;
    // top: 30%;
  `,
  SearchingMiddle: styled.View`
    height: ${height * 0.8}px;
    margin: 5px 15px 0px 15px;
  `,
};

const SearchResult = ({ navigation, route }) => {
  const url = useSelector((state) => state.url);
  axios.defaults.baseURL = url;

  const searchValue = route.params.searchValue;
  const [text, setText] = useState("");
  const [searchingResult, setSearchingResult] = useState([]);

  const onChangeSearch = (word) => {
    axios
      .post("search/stores/1", {
        text: word,
      })
      .then((res) => {
        console.log("받아온 값" + JSON.stringify(res.data));
        setSearchingResult(res.data);
      })
      .catch((err) => {
        console.log("검색 에러: " + err);
      });
  };

  useEffect(() => {
    setText(searchValue);
    onChangeSearch(searchValue);
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#FFFFFF",
        flex: 1,
      }}
    >
      <SC.Container>
        <SC.Top>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <AntDesign
              name="arrowleft"
              style={styles.topIcon}
              color="#797D7F"
            />
          </TouchableOpacity>
          <SC.SearchInput
            multiline={false}
            returnKeyType={"search"}
            value={text}
            onChangeText={(val) => {
              setText(val);
            }}
            // onSubmitEditing={addSearch}
            maxLength={20}
            placeholder="검색어를 입력하세요"
          ></SC.SearchInput>
          <SC.ClearBtn onPress={() => setText("")}>
            <Feather
              name="x-circle"
              size={20}
              color={text ? "#999999" : "#fff"}
            />
          </SC.ClearBtn>
        </SC.Top>

        {searchingResult.map((value) => {
          return (
            <StoreEle
              storeName={value.store_name}
              content={""}
              location={""}
              navigation={navigation}
            />
          );
        })}
      </SC.Container>
    </SafeAreaView>
  );
};

export default SearchResult;

const styles = StyleSheet.create({
  topIcon: {
    fontSize: RFPercentage(3.5),
  },
});
