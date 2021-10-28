import React from 'react';
// import 'react-native-gesture-handler';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView, Dimensions, TextInput } from 'react-native';
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import { RFPercentage } from "react-native-responsive-fontsize";
import styled from 'styled-components/native';

import SearchEle from '../../Components/SearchEle/index';

const Container = styled.View`
  background-color: #fff;
  padding-top: 45px;
  flex: 1;
  // height: 100%;
`
const Top = styled.View`
  flex: 0.7;
  margin-bottom: 30px;
  padding: 0 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const Middle = styled.View`
  flex: 9.3;
`
const MiddleHeader = styled.View`
  padding: 0 20px 15px 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: #797D7F;
`
const RecentSearch = styled.Text`
  font-size: 20px;
  font-weight: bold;
`
const AllDeleteBtn = styled.Text`
  font-size: 20px;
  color: #797D7F;
`

const Search = ({ navigation }) => {

  const recentSearchWord = [
    { word: "맛사랑", date: "09.08" },
    { word: "찌개사랑", date: "09.07" },
    { word: "스타벅스", date: "09.06" },
    { word: "투썸플레이스", date: "09.05" },
    { word: "가메이", date: "09.04" },
    { word: "영종식당", date: "09.03" },
    { word: "서브웨이", date: "09.02" },
    { word: "오겡끼", date: "09.01" },
  ];

  return <Container>
    <Top>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack()
        }}>
        <AntDesign name="arrowleft" style={styles.topIcon} color="#797D7F" />
      </TouchableOpacity>
      <TextInput
        style={styles.searchInput}
        maxLength={10}
        placeholder="검색어를 입력하세요"
      />
      <TouchableOpacity>
        <Ionicons name="ios-search-outline" style={styles.topIcon} color="#797D7F" />
      </TouchableOpacity>
    </Top>

    <Middle>
      <MiddleHeader>
        <RecentSearch>최근 검색어</RecentSearch>
        <TouchableOpacity>
          <AllDeleteBtn>전체삭제</AllDeleteBtn>
        </TouchableOpacity>
      </MiddleHeader>

      <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 15 }}>
        {recentSearchWord.map((item, index) => {
          return <SearchEle key={index} text={item.word} date={item.date}></SearchEle>
        }
        )}
      </ScrollView>
    </Middle>

  </Container>
}

export default Search;

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff'
  // },
  // top: {
  //   flex: 0.7,
  //   paddingHorizontal: 20, 
  //   flexDirection: 'row',
  //   alignItems:"center",
  //   justifyContent: 'space-between',
  // },
  topIcon: {
    fontSize: RFPercentage(3.5),
  },
  searchInput: {
    backgroundColor: '#EBEDEF',
    borderRadius: 20,
    width: '70%',
    height: '80%',
    paddingHorizontal: 15,
  },
  // searchWrap: {
  //   flex: 9.3,
  // },
  textWrap: {
    marginTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: "#797D7F",
  },
  // recentSearch: {
  //   fontSize: RFPercentage(2.4),
  //   fontWeight: 'bold'
  // },
  // allDeleteBtn: {
  //   fontSize: RFPercentage(1.7),
  //   color: "#797D7F"
  // },
  // searchElement: {
  //   flexDirection: 'row',
  //   alignItems:"center",
  //   marginBottom: 15,
  //   justifyContent: 'space-between',
  // },
  // recentSearchIcon: {
  //   fontSize: RFPercentage(2),
  // },
  // searchWordWrap: {
  //   flexDirection: 'row',
  //   alignItems:"center",
  // },
  // searchWord: {
  //   fontSize: RFPercentage(2.2),
  //   width: Dimensions.get('window').width*0.6,
  //   marginRight: 10,
  //   backgroundColor: 'pink',
  // },
  // searchDate: {
  //   fontSize: RFPercentage(2.2),
  // },
});