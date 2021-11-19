import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, StatusBar, ScrollView, Dimensions, TextInput, SafeAreaView, Alert } from 'react-native';
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import { RFPercentage } from "react-native-responsive-fontsize";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled, { css } from 'styled-components/native';
import SearchEle from '../../Components/SearchEle/index';

const StatusBarHeight = StatusBar.currentHeight;
const { width, height } = Dimensions.get('window');

const SC = {
  Container: styled.View`
    background-color: #fff;
    padding: 0 20px;
    // height: 100%;

    ${(Platform.OS === 'android') ?
      css`
        padding-top : ${StatusBarHeight + 15}px;
      `: undefined}
  `,
  Top: styled.View`
    height: ${height * 0.07}px;
    margin-bottom: 30px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  `,
  Middle: styled.View`
    height: ${height * 0.8}px;
  `,
  MiddleHeader: styled.View`
    padding-bottom: 3px;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
    border-bottom-width: 1px;
    border-bottom-color: #797D7F;
  `,
  RecentSearch: styled.Text`
    font-size: 20px;
    font-weight: bold;
  `,
  AllDeleteBtn: styled.Text`
    font-size: 10px;
    color: #797D7F;
  `,
}

const STORAGE_KEY = "@searchWords";

const Search = ({ navigation }) => {
  const [text, setText] = useState("");
  const [searchWords, setSearchWords] = useState({});

  useEffect(() => {
    loadSearch();
  }, []);

  const onChangeText = (payload) => setText(payload);
  const saveSearch = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
  }
  const loadSearch = async () => {
    try {
      const s = await AsyncStorage.getItem(STORAGE_KEY);
      setSearchWords(JSON.parse(s));
    } catch (e) {
      alert(e);
    }
  };
  const addSearch = async () => {
    if (text === "") return
    const newSearch = { ...searchWords, [Date.now()]: text };
    setSearchWords(newSearch);
    await saveSearch(newSearch);
    setText("");
  };
  const deleteSearch = async (key) => {
    const newSearch = { ...searchWords };
    delete newSearch[key];
    setSearchWords(newSearch);
    await saveSearch(newSearch);
  };
  const allDeleteSearch = () => {
    Alert.alert("최근검색어를 모두 삭제하시겠습니까?",
      [
        { text: "취소" },
        {
          text: "확인", onPress: async () => {
            setSearchWords({});
            await saveSearch({});
          }
        },
      ],
      { cancelable: true }
    );
    return;
  }

  return (
    <SafeAreaView style={{
      backgroundColor: '#FFFFFF',
      flex: 1
    }}>
      <SC.Container>
        <SC.Top>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack()
            }}>
            <AntDesign name="arrowleft" style={styles.topIcon} color="#797D7F" />
          </TouchableOpacity>
          <TextInput
            multiline={false}
            returnKeyType={"search"}
            value={text}
            onChangeText={onChangeText}
            onSubmitEditing={addSearch}
            style={styles.searchInput}
            maxLength={10}
            placeholder="검색어를 입력하세요"
          />
          <TouchableOpacity>
            <Ionicons name="ios-search-outline" style={styles.topIcon} color="#797D7F" />
          </TouchableOpacity>
        </SC.Top>

        <SC.Middle>
          <SC.MiddleHeader>
            <SC.RecentSearch>최근 검색어</SC.RecentSearch>
            <TouchableOpacity>
              <SC.AllDeleteBtn onPress={() => allDeleteSearch()}>전체삭제</SC.AllDeleteBtn>
            </TouchableOpacity>
          </SC.MiddleHeader>

          <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 15 }}>
            {Object.keys(searchWords).map((key) => {
              return <SearchEle key={key} text={searchWords[key]} onPress={() => deleteSearch(key)}></SearchEle>
            })}
          </ScrollView>
        </SC.Middle>

      </SC.Container>
    </SafeAreaView>
  )
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