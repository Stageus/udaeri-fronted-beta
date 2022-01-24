import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Platform,
  StatusBar,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { restoreCurStore, addSearchWord } from "../../../../reducer/index";
import SearchResultEle from "../Search/SearchResultEle";

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
    border-bottom-color: #999999;
    position: relative;
  `,
  SearchInput: styled.TextInput`
    background-color: #fff;
    border-radius: 5px;
    width: 85%;
    padding: 5px 30px 5px 15px;
  `,
  SearchingMiddle: styled.View`
    height: ${height * 0.8}px;
    margin: 5px 15px 0px 15px;
  `,
  StoreWrap: styled.TouchableOpacity`
    position: absolute;
    bottom: 0;
    z-index: 5;
    width: 100%;
    height: 150px;
    background-color: #fff;
    padding: 12px;
  `,
  StoreInfoTop: styled.View`
    flex-direction: row;
    align-items: center;
    padding: 3px 0px;
  `,
  StoreName: styled.Text`
    font-size: 16px;
    font-family: Bold;
    margin-right: 5px;
  `,
  StoreCategory: styled.Text`
    font-size: 12px;
    font-family: Regular;
    color: #999999;
  `,
  StoreInfo: styled.Text`
    font-size: 14px;
    font-family: Regular;
  `,
};

const MapSearchResult = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const url = useSelector((state) => state.url);
  axios.defaults.baseURL = url;

  const searchValue = route.params.searchValue;

  const recentSearchList = useSelector((state) => state.recentSearchList);
  const mainColor = useSelector((state) => state.mainColor);
  const clickedStore = useSelector((state) => state.curStore);

  const [text, setText] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [target, setTarget] = useState(null);
  const [storeInfo, setStoreInfo] = useState({});
  const [inputFocusCheck, setInputFocusCheck] = useState(false);
  const [initialRegion, setInitialRegion] = useState({
    latitude: 37.4513546060566,
    longitude: 126.65759221275367,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const getSearchStore = (word) => {
    axios
      .post("search/stores/1", {
        text: word,
      })
      .then((res) => {
        setSearchList(res.data);
      })
      .catch((err) => {
        console.log("검색 에러: " + err);
      });
  };

  useEffect(() => {}, [storeInfo, clickedStore]);
  useEffect(() => {
    setText(searchValue);
    getSearchStore(searchValue);
    dispatch(restoreCurStore(null));
    setTarget(null);
  }, []);

  const xBtnClick = () => {
    navigation.navigate("Map");
    dispatch(restoreCurStore(null));
  };

  const getStoreInfo = (storeName) => {
    axios
      .get(
        "/l-categories/" +
          null +
          "/m-categories/" +
          null +
          "/stores/" +
          storeName +
          "/information"
      )
      .then((res) => {
        setStoreInfo(res.data);
      })
      .catch((err) => {
        console.log("클릭한 가게 정보를 찾을 수 없어요" + err);
      });
  };
  const handlePinClick = (pinStoreName) => {
    setTarget(pinStoreName);
    getStoreInfo(pinStoreName);
    dispatch(restoreCurStore(pinStoreName));
  };

  const searchSubmit = () => {
    setInputFocusCheck(false);
    getSearchStore(text);
    dispatch(addSearchWord(recentSearchList, text));
  };

  const onChangeText = (val) => {
    setText(val);
    getSearchStore(val);
  };

  const onSubmitEditing = () => {
    searchSubmit(text), setInputFocusCheck(false);
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
              style={{ fontSize: RFPercentage(3.5) }}
              color="#797D7F"
            />
          </TouchableOpacity>
          <SC.SearchInput
            multiline={false}
            returnKeyType={"search"}
            value={text}
            onChangeText={(val) => onChangeText(val)}
            onFocus={() => setInputFocusCheck(true)}
            onSubmitEditing={() => onSubmitEditing()}
            maxLength={20}
            placeholder="검색어를 입력하세요"
          ></SC.SearchInput>
          <TouchableOpacity onPress={() => xBtnClick()}>
            <Feather
              name="x-circle"
              size={20}
              color={text ? "#999999" : "#fff"}
            />
          </TouchableOpacity>
        </SC.Top>

        {inputFocusCheck ? (
          <>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ marginTop: 5, paddingHorizontal: 15 }}
            >
              {searchList.map((value) => {
                return (
                  <SearchResultEle
                    key={value.store_name}
                    storeName={value.store_name}
                    navigation={navigation}
                    page="second"
                    getSearchStore={getSearchStore}
                    setInputFocusCheck={setInputFocusCheck}
                    setText={setText}
                  ></SearchResultEle>
                );
              })}
            </ScrollView>
          </>
        ) : (
          <>
            <MapView
              initialRegion={initialRegion}
              provider={PROVIDER_GOOGLE}
              style={{ height: "100%", width: "100%" }}
            >
              {searchList.map((item, index) => {
                return (
                  <>
                    <MapView.Marker
                      key={index}
                      coordinate={{
                        latitude: !item.latitude ? 0 : Number(item.latitude),
                        longitude: !item.longitude ? 0 : Number(item.longitude),
                      }}
                      onPress={() => handlePinClick(item.store_name)}
                    >
                      {target === item.store_name ? (
                        <FontAwesome
                          name="map-marker"
                          size={37}
                          color={mainColor}
                        />
                      ) : (
                        <FontAwesome
                          name="map-marker"
                          size={30}
                          color={mainColor}
                        />
                      )}
                    </MapView.Marker>
                  </>
                );
              })}
            </MapView>
            {clickedStore ? (
              <SC.StoreWrap
                onPress={() => {
                  navigation.navigate("StorePage", {
                    key: target,
                  });
                }}
              >
                <SC.StoreInfoTop>
                  <SC.StoreName>{storeInfo.store}</SC.StoreName>
                  <SC.StoreCategory>{storeInfo.call_number}</SC.StoreCategory>
                </SC.StoreInfoTop>

                <SC.StoreInfo>{storeInfo.location}</SC.StoreInfo>
              </SC.StoreWrap>
            ) : (
              <></>
            )}
          </>
        )}
      </SC.Container>
    </SafeAreaView>
  );
};

export default MapSearchResult;
