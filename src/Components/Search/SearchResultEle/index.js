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
import { restoreCurStore } from "../../../../reducer/index";

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
  const grayColor = useSelector((state) => state.grayColor);
  const dispatch = useDispatch();
  const { text = "", navigation = {} } = props;

  return (
    <SC.Container>
      <Text>
        <Ionicons name="ios-search-outline" size={18} color={grayColor} />
      </Text>
      <SC.SearchWordWrap
        onPress={() => {
          navigation.navigate("StorePage", {
            key: text,
          });
          dispatch(restoreCurStore(text));
        }}
      >
        <SC.SearchWord numberOfLines={1}>{text}</SC.SearchWord>
      </SC.SearchWordWrap>
    </SC.Container>
  );
};

export default SearchResultEle;
