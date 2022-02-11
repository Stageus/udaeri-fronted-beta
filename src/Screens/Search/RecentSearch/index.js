import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  StatusBar,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Alert,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled, { css } from "styled-components/native";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  restoreSearchWord,
  addSearchWord,
  deleteSearchWord,
} from "../../../../reducer/index";
import SaveSearchEle from "../../../Components/Search/SaveSearchEle";
import SearchResultEle from "../../../Components/Search/SearchResultEle";

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
    border-bottom-color: gray;
    position: relative;
  `,
  SearchInput: styled.TextInput`
    background-color: #fff;
    border-radius: 5px;
    width: 85%;
    padding: 5px 30px 5px 15px;
    font-size: ${RFPercentage(2.5)};
  `,
  Middle: styled.View`
    height: ${height * 0.8}px;
    margin-top: 20px;
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
  NoRecentSearch: styled.Text`
    font-size: 16px;
  `,
};

const RecentSearch = ({ navigation }) => {
  const dispatch = useDispatch();

  const url = useSelector((state) => state.url);
  axios.defaults.baseURL = url;

  const [text, setText] = useState("");
  const [searchingResult, setSearchingResult] = useState([]);
  const recentSearchList = useSelector((state) => state.recentSearchList);

  const STORAGE_KEY = "@searchWords";

  // asyncstorage에 최근검색어를 배열로 넣음
  const saveSearch = async (searchWordList) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(searchWordList));
  };

  // 첫 렌더링 때 asyncstorage에 있는 최근검색어 가져옴
  const loadSearch = async () => {
    try {
      const searchedList = await AsyncStorage.getItem(STORAGE_KEY);
      dispatch(restoreSearchWord(JSON.parse(searchedList)));
    } catch (err) {
      console.log("최근검색어 storage에서 불러오기 실패: " + err);
    }
  };

  useEffect(() => {
    loadSearch();
    setText("");
  }, []);

  useEffect(() => {
    saveSearch(recentSearchList);
  }, [recentSearchList]);

  const onChangeSearch = (word) => {
    axios
      .post("search/stores/1", {
        text: word,
      })
      .then((res) => {
        word === "" ? setSearchingResult([]) : {};
        res.data.length !== 0 ? setSearchingResult(res.data) : {};
      })
      .catch((err) => {
        console.log("검색 에러: " + err);
      });
  };

  // 검색어 입력 후 submit할 때 최근검색어 목록에 검색어가 추가되는 함수
  const addSearchWordSubmit = () => {
    if (searchingResult.length !== 0)
      dispatch(addSearchWord(recentSearchList, text));
  };

  // 검색어 입력 후 submit할 때 실행되는 함수
  const searchSubmit = () => {
    if (text !== "") {
      addSearchWordSubmit();
      setText("");
      navigation.navigate("SearchResult", {
        searchValue: text,
      });
    }
  };

  const allDeleteSearch = () => {
    Alert.alert("최근검색어를 모두 삭제하시겠습니까?", "", [
      { text: "취소", style: "cancel" },
      {
        text: "확인",
        onPress: async () => {
          dispatch(restoreSearchWord([]));
        },
      },
    ]);
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
          {/* <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" style={styles.topIcon} color="gray" />
          </TouchableOpacity> */}
          <SC.SearchInput
            multiline={false}
            returnKeyType={"search"}
            value={text}
            onChangeText={(val) => {
              setText(val);
              onChangeSearch(val);
            }}
            onSubmitEditing={() => searchSubmit()}
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

        {!text ? (
          <SC.Middle>
            <SC.MiddleHeader>
              <SC.RecentSearch>최근 검색</SC.RecentSearch>
              <TouchableOpacity onPress={() => allDeleteSearch()}>
                <SC.AllDeleteBtn>전체삭제</SC.AllDeleteBtn>
              </TouchableOpacity>
            </SC.MiddleHeader>

            {/* 최근 검색어가 없을 때 */}
            {recentSearchList && recentSearchList.length === 0 ? (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <SC.NoRecentSearch>최근 검색어가 없습니다.</SC.NoRecentSearch>
              </View>
            ) : (
              // 최근 검색어가 있을 때 최근 검색어 목록 보여줌
              <ScrollView
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ marginTop: 5 }}
              >
                {recentSearchList &&
                  recentSearchList.map((searchWord) => {
                    return (
                      <SaveSearchEle
                        key={searchWord}
                        text={searchWord}
                        setText={setText}
                        deleteBtn={() =>
                          dispatch(
                            deleteSearchWord(recentSearchList, searchWord)
                          )
                        }
                        navigation={navigation}
                      ></SaveSearchEle>
                    );
                  })}
              </ScrollView>
            )}
          </SC.Middle>
        ) : (
          // 연관 검색어 목록들
          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ marginTop: 5, paddingHorizontal: 15 }}
          >
            {searchingResult.map((value) => {
              return (
                <SearchResultEle
                  key={value.store_name}
                  storeName={value.store_name}
                  navigation={navigation}
                  page="first"
                ></SearchResultEle>
              );
            })}
          </ScrollView>
        )}
      </SC.Container>
    </SafeAreaView>
  );
};

export default RecentSearch;

const styles = StyleSheet.create({
  topIcon: {
    fontSize: RFPercentage(3.5),
  },
});
