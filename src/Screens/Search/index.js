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
  Alert,
} from "react-native";
import { AntDesign, Ionicons, Feather } from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled, { css } from "styled-components/native";
import SearchEle from "../../Components/SearchEle/index";

const StatusBarHeight = StatusBar.currentHeight;
const { width, height } = Dimensions.get("window");

const SC = {
  Container: styled.View`
    background-color: #fff;
    padding: 0 20px;
    // height: 100%;

    ${Platform.OS === "android"
      ? css`
          padding-top: ${StatusBarHeight + 15}px;
        `
      : undefined}
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
    border-bottom-color: #797d7f;
  `,
  RecentSearch: styled.Text`
    font-size: 20px;
    font-weight: bold;
  `,
  AllDeleteBtn: styled.Text`
    font-size: 10px;
    color: #797d7f;
  `,
  NoRecentSearchWrap: styled.View`
    height: 200px;
    width: 200px;
    background-color: yellow;
  `,
  NoRecentSearchText: styled.Text`
    font-size: 50px;
  `,
};

const STORAGE_KEY = "@searchWords";

const Search = ({ navigation }) => {
  const [text, setText] = useState("");
  const [searchWords, setSearchWords] = useState({});

  useEffect(() => {
    loadSearch();
  }, []);

  const saveSearch = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  };
  const loadSearch = async () => {
    try {
      const s = await AsyncStorage.getItem(STORAGE_KEY);
      setSearchWords(JSON.parse(s));
    } catch (e) {
      alert(e);
    }
  };

  const deleteSearch = async (key) => {
    const newSearch = { ...searchWords };
    delete newSearch[key];
    setSearchWords(newSearch);
    await saveSearch(newSearch);
  };

  const addSearch = async () => {
    if (text === "") return;

    const wordKeyCheck = Object.keys(searchWords).find(
      (key) => searchWords[key] === text
    );

    if (wordKeyCheck !== undefined) {
      const copySearch = { ...searchWords };
      delete copySearch[wordKeyCheck];
      const newSearch = { [Date.now()]: text, ...copySearch };
      await saveSearch(newSearch);
      setSearchWords(newSearch);
    } else {
      const newSearch = { [Date.now()]: text, ...searchWords };
      setSearchWords(newSearch);
      await saveSearch(newSearch);
    }
    setText("");
  };

  const allDeleteSearch = () => {
    Alert.alert(
      "최근검색어를 모두 삭제하시겠습니까?",
      "",
      [
        { text: "취소", style: "cancel" },
        {
          text: "확인",
          onPress: async () => {
            setSearchWords({});
            await saveSearch({});
          },
        },
      ],
      { cancelable: true }
    );
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
          <TextInput
            multiline={false}
            returnKeyType={"search"}
            value={text}
            onChangeText={setText}
            onSubmitEditing={addSearch}
            style={styles.searchInput}
            maxLength={10}
            placeholder="검색어를 입력하세요"
          />
          <TouchableOpacity>
            <Ionicons
              name="ios-search-outline"
              style={styles.topIcon}
              color="#797D7F"
            />
          </TouchableOpacity>
        </SC.Top>

        <SC.Middle>
          <SC.MiddleHeader>
            <SC.RecentSearch>최근 검색어</SC.RecentSearch>
            <TouchableOpacity>
              <SC.AllDeleteBtn onPress={() => allDeleteSearch()}>
                전체삭제
              </SC.AllDeleteBtn>
            </TouchableOpacity>
          </SC.MiddleHeader>

          {Object.keys(searchWords).length === 0 &&
          searchWords.constructor === Object ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Text style={{ fontSize: 16 }}>최근 검색어가 없습니다.</Text>
            </View>
          ) : (
            <ScrollView
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 15 }}
            >
              {Object.keys(searchWords).map((key) => {
                return (
                  <SearchEle
                    key={key}
                    text={searchWords[key]}
                    onPress={() => deleteSearch(key)}
                  ></SearchEle>
                );
              })}
            </ScrollView>
          )}
        </SC.Middle>
      </SC.Container>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  topIcon: {
    fontSize: RFPercentage(3.5),
  },
  searchInput: {
    backgroundColor: "#EBEDEF",
    borderRadius: 20,
    width: "70%",
    height: "80%",
    paddingHorizontal: 15,
  },
});
