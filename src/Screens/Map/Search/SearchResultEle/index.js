import React from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Ionicons, Feather } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Dimensions,
  TextInput,
} from "react-native";
import styled from "styled-components/native";
import { useSelector, useDispatch } from "react-redux";
import { addSearchWord, restoreCurStore } from "../../../../../reducer/index";

const SC = {
  Container: styled.View`
    flex-direction: row;
    align-items: center;
  `,
  SearchWordWrap: styled.TouchableOpacity`
    // flex: 1;
    // flex-direction: row;
    // align-items: center;
    padding: 10px 0px 10px 10px;
  `,
  SearchWord: styled.Text`
    font-size: ${RFPercentage(2.2)};
    margin-right: 10px;
  `,
};

const SearchResultEle = (props) => {
  const dispatch = useDispatch();
  const grayColor = useSelector((state) => state.grayColor);
  const recentSearchList = useSelector((state) => state.recentSearchList);

  const {
    storeName = "",
    navigation = {},
    page = "",
    getSearchStore = {},
    setInputFocusCheck = {},
    setText = {},
  } = props;

  const firstPageOnclick = () => {
    navigation.navigate("MapSearchResult", {
      searchValue: storeName,
    });
    dispatch(addSearchWord(recentSearchList, storeName));
    dispatch(restoreCurStore(null));
  };

  const secondPageOnclick = () => {
    getSearchStore(storeName);
    dispatch(addSearchWord(recentSearchList, storeName));
    setInputFocusCheck(false);
    setText(storeName);
    dispatch(restoreCurStore(null));
  };

  return (
    <SC.Container>
      <Text>
        <Ionicons name="ios-search-outline" size={18} color={grayColor} />
      </Text>
      <SC.SearchWordWrap
        onPress={() => {
          page === "first" ? firstPageOnclick() : secondPageOnclick();
        }}
      >
        <SC.SearchWord numberOfLines={1}>{storeName}</SC.SearchWord>
      </SC.SearchWordWrap>
    </SC.Container>
  );
};

export default SearchResultEle;
