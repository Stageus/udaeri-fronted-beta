import React from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Text, View, TouchableOpacity, Dimensions } from "react-native";
import styled from "styled-components/native";
import { useSelector, useDispatch } from "react-redux";
import { addSearchWord } from "../../../../reducer/index";

const { width, height } = Dimensions.get("window");

const SC = {
  Container: styled.View`
    border-bottom-width: 1px;
    border-bottom-color: #cccccc;
  `,
  SearchEleWrap: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
  `,
  SearchWordWrap: styled.TouchableOpacity`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 18px 5px 18px 10px;
  `,
  SearchWord: styled.Text`
    font-size: ${RFPercentage(2.2)};
    margin-right: 10px;
  `,
};

const SaveSearchEle = (props) => {
  const grayColor = useSelector((state) => state.grayColor);
  const dispatch = useDispatch();

  const { text = "", deleteBtn = {}, navigation = {}, setText = {} } = props;
  const recentSearchList = useSelector((state) => state.recentSearchList);

  return (
    <SC.Container>
      <SC.SearchEleWrap>
        <Text>
          <Ionicons name="ios-search-outline" size={18} color={grayColor} />
        </Text>
        <SC.SearchWordWrap
          onPress={() => {
            navigation.navigate("SearchResult", {
              searchValue: text,
            });
            setText("");
            dispatch(addSearchWord(recentSearchList, text));
          }}
        >
          <SC.SearchWord numberOfLines={1}>{text}</SC.SearchWord>
        </SC.SearchWordWrap>

        <TouchableOpacity onPress={deleteBtn}>
          <Feather name="x" size={15} color={grayColor} />
        </TouchableOpacity>
      </SC.SearchEleWrap>
    </SC.Container>
  );
};

export default SaveSearchEle;
