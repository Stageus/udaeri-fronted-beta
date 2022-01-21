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

import { addSearchWord } from "../../../../reducer/index";
import SearchResultEle from "../../../Components/Search/SearchResultEle";
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
  `,
  SearchInput: styled.TextInput`
    background-color: #fff;
    border-radius: 5px;
    width: 85%;
    padding: 5px 30px 5px 15px;
  `,
  SearchingMiddle: styled.View`
    height: ${height * 0.8}px;
    margin: 5px 15px 0px 15px;
  `,
};

const SearchResult = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const url = useSelector((state) => state.url);
  axios.defaults.baseURL = url;

  const searchValue = route.params.searchValue;
  const recentSearchList = useSelector((state) => state.recentSearchList);
  const [text, setText] = useState("");
  const [searchResultList, setSearchResultList] = useState([]);
  const [searchingResult, setSearchingResult] = useState([]);

  const getSearchStore = (word) => {
    axios
      .post("search/stores/1", {
        text: word,
      })
      .then((res) => {
        console.log("받아온 값" + JSON.stringify(res.data));
        setSearchResultList(res.data);
      })
      .catch((err) => {
        console.log("검색 에러: " + err);
      });
  };

  useEffect(() => {
    setText(searchValue);
    getSearchStore(searchValue);
  }, []);

  const getRelatedStore = (word) => {
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

  const searchSubmit = () => {
    setSearchingResult([]);
    getSearchStore(text);
    dispatch(addSearchWord(recentSearchList, text));
  };

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
              getRelatedStore(val);
            }}
            onSubmitEditing={() => searchSubmit(text)}
            maxLength={20}
            placeholder="검색어를 입력하세요"
          ></SC.SearchInput>
          <TouchableOpacity onPress={() => setText("")}>
            <Feather
              name="x-circle"
              size={20}
              color={text ? "#999999" : "#fff"}
            />
          </TouchableOpacity>
        </SC.Top>

        {searchingResult.length === 0 ? (
          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ marginTop: 5 }}
          >
            {searchResultList.map((value) => {
              return (
                <StoreEle
                  key={value}
                  storeName={value.store_name}
                  content={""}
                  location={""}
                  navigation={navigation}
                />
              );
            })}
          </ScrollView>
        ) : (
          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ marginTop: 5, paddingHorizontal: 15 }}
          >
            {searchingResult.map((value) => {
              return (
                <SearchResultEle
                  key={value.store_name}
                  searchValue={text}
                  storeName={value.store_name}
                  navigation={navigation}
                  searchingResultReset={setSearchingResult}
                  searchText={getSearchStore}
                  page="second"
                ></SearchResultEle>
              );
            })}
          </ScrollView>
        )}
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
