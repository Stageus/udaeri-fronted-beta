import React from 'react';
import { RFPercentage } from "react-native-responsive-fontsize";
import { Ionicons, Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView, Dimensions, TextInput } from 'react-native';
import styled from 'styled-components/native';

const { width, height } = Dimensions.get('window');

const SearchEleWrap = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
  justify-content: space-between;
`
const SearchWordWrap = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const SearchWord = styled.Text`
  font-size: ${RFPercentage(2.2)};
  // width: ${width * 0.6};
  margin-right: 10px;
`
const SearchDate = styled.Text`
  font-size: ${RFPercentage(2.2)};
`

const SearchEle = (props) => {

  return (
    <SearchEleWrap>
      <Text>
        <Ionicons name="ios-search-outline" size={15} color="#797D7F" />
      </Text>
      <SearchWordWrap>
        <SearchWord numberOfLines={1}>{props.text}</SearchWord>
        <SearchDate>{props.date}</SearchDate>
      </SearchWordWrap>

      <TouchableOpacity>
        <Text>
          <Feather name="x" size={15} color="black" />
        </Text>
      </TouchableOpacity>


    </SearchEleWrap>
  )
}

export default SearchEle;
