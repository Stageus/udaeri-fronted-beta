import React from 'react';
import { RFPercentage } from "react-native-responsive-fontsize";
import { Ionicons, Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView, Dimensions, TextInput } from 'react-native';
import styled from 'styled-components/native';

const { width, height } = Dimensions.get('window');

const SearchEleWrap = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
  justify-content: space-between;
`
const SearchWordWrap = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px 5px 5px 10px;
`
const SearchWord = styled.Text`
  font-size: ${RFPercentage(2.2)};

  // width: ${width * 0.6};
  margin-right: 10px;
`
const SearchDate = styled.Text`
  font-size: ${RFPercentage(2.2)};
`
interface Props {
  text: string;
  date: string;
  onPress: void;
}


const SearchEle = ({text, date, onPress}: Props) => {

  return (
    <SearchEleWrap>
      <Text>
        <Ionicons name="ios-search-outline" size={15} color="#797D7F" />
      </Text>
      <SearchWordWrap>
        <SearchWord numberOfLines={1}>{text}</SearchWord>
        {/* <SearchDate>{date}</SearchDate> */}
      </SearchWordWrap>

      <TouchableOpacity onPress={onPress}>
        <Feather name="x" size={15} color="black" />
      </TouchableOpacity>
    </SearchEleWrap>
  )
}

export default SearchEle;
