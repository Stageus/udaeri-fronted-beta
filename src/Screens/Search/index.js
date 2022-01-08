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
import { AntDesign, Feather } from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled, { css } from "styled-components/native";
import SearchEle from "../../Components/SearchEle/index";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

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
    margin-bottom: 20px;
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
  Middle: styled.View`
    height: ${height * 0.8}px;
  `,
  MiddleHeader: styled.View`
    padding: 0 20px;
    padding-bottom: 3px;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
  `,
  RecentSearch: styled.Text`
    font-size: 20px;
    font-weight: bold;
  `,
  AllDeleteBtn: styled.Text`
    font-size: 10px;
    color: #797d7f;
  `,
};

const STORAGE_KEY = "@searchWords";

const Search = ({ navigation }) => {
  const url = useSelector((state) => state.url);
  axios.defaults.baseURL = url;

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

  const onChangeSearch = (word) => {
    axios
      .post("search/stores/1", {
        text: word,
      })
      .then((res) => {
        console.log(JSON.stringify(res.data));
        console.log("검색단어: " + word);
      })
      .catch((err) => {
        console.log("검색 에러: " + err);
      });
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
              setText(val), onChangeSearch(val);
            }}
            onSubmitEditing={addSearch}
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

        <SC.Middle>
          <SC.MiddleHeader>
            <SC.RecentSearch>최근 검색</SC.RecentSearch>
            <TouchableOpacity onPress={() => allDeleteSearch()}>
              <SC.AllDeleteBtn>전체삭제</SC.AllDeleteBtn>
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
              <Text>최근 검색어가 없습니다.</Text>
            </View>
          ) : (
            <ScrollView
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ marginTop: 5 }}
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
});
