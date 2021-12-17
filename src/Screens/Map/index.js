import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  Dimensions,
  Text,
  View,
} from "react-native";
import styled, { css } from "styled-components/native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

import HeaderBar from "../../Components/HeaderBar";
import MiddleCatBtn from "./MiddleCatBtn/index";
import MiddleCatBtnWrap from "./MiddleCatBtnWrap/index";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const StatusBarHeight = StatusBar.currentHeight;
const SC = {
  Container: styled.View`
    background-color: #fff;
    flex: 1;
    ${Platform.OS === "android"
      ? css`
          padding-top: ${StatusBarHeight + 15}px;
        `
      : undefined}
  `,
  Category: styled.View`
    height: 25px;
    background-color: yellow;
    align-items: center;
    justify-content: space-between;
    margin-right: 15px;
    padding: 4px 10px;
  `,
  LargeCatWrap: styled.View`
    flex-direction: row;
    justify-content: space-between;
  `,
};

const Map = ({ navigation, route }) => {
  const [clickedCat, setClickedCat] = useState("");
  const url = useSelector((state) => state.url);
  const clickedMiddle = useSelector((state) => state.mapMiddleCatBtn);
  const largeCat = useSelector((state) => state.largeCat);

  console.log("대분류" + largeCat);

  useEffect(() => {}, [clickedCat]);

  const [initialRegion, setInitialRegion] = useState({
    latitude: 37.4513546060566,
    longitude: 126.65759221275367,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  // const [markers, setMarkers] = useState({
  //   food: [
  //     {
  //       latitude: 37.45181047308198,
  //       longitude: 126.65688354141875,
  //       title: "가메이",
  //     },
  //     {
  //       latitude: 37.45133942595257,
  //       longitude: 126.65938738189837,
  //       title: "산쪼메",
  //     },
  //   ],
  //   cafe: [
  //     {
  //       latitude: 37.451789,
  //       longitude: 126.654988,
  //       title: "스타벅스",
  //     },
  //   ],
  //   bar: [
  //     {
  //       latitude: 37.45236872360831,
  //       longitude: 126.65653699724074,
  //       title: "병헤는 밤",
  //     },
  //   ],
  // });

  const [largeCatList, setLargeCatList] = useState([]);
  const [middleCatList, setMiddleCatList] = useState([]);
  const [middleCatLocation, setMiddleCatLocation] = useState([]);

  const MiddleCatListAPI = (largeCat) => {
    setClickedCat(largeCat);
    axios
      .get(url + "/l-categories/" + largeCat + "/m-categories")
      .then((res) => {
        setMiddleCatList(res.data.list);
      })
      .catch((err) => {
        console.log("중분류 카테고리 못 받음");
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(
        url +
          "/l-categories/" +
          clickedCat +
          "/m-categories/" +
          clickedMiddle +
          "/stores/location"
      )
      .then((res) => {
        setMiddleCatLocation(res.data.list);
      })
      .catch((err) => {
        console.log("클릭한 중분류를 찾을 수 없어요");
        console.log(err);
      });
  }, [clickedMiddle]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#FFFFFF",
        flex: 1,
      }}
    >
      <SC.Container>
        <SC.LargeCatWrap>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {largeCat.map((item, index) => {
              return (
                <SC.Category>
                  <Text onPress={() => MiddleCatListAPI(item.name)}>
                    {item.name}
                  </Text>
                </SC.Category>
              );
            })}
          </ScrollView>
        </SC.LargeCatWrap>
        <View>
          {
            {
              먹거리: <MiddleCatBtnWrap cat={middleCatList}></MiddleCatBtnWrap>,
              카페: <MiddleCatBtnWrap cat={middleCatList}></MiddleCatBtnWrap>,
              놀거리: <MiddleCatBtnWrap cat={middleCatList}></MiddleCatBtnWrap>,
              술집: <MiddleCatBtnWrap cat={middleCatList}></MiddleCatBtnWrap>,
              서비스: <MiddleCatBtnWrap cat={middleCatList}></MiddleCatBtnWrap>,
              상점: <MiddleCatBtnWrap cat={middleCatList}></MiddleCatBtnWrap>,
            }[clickedCat]
          }
        </View>

        <MapView
          initialRegion={initialRegion}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          style={{ flex: 1, width: "100%", height: "100%" }}
        >
          {middleCatLocation.map((item, index) => {
            return (
              <MapView.Marker
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}
                title={item.store_name}
              />
            );
          })}
          {/* <MapView.Marker
            coordinate={{
              latitude: 37.451789,
              longitude: 126.654988,
            }}
            title="스타벅스"
            description="스타스타스타벅스"
          /> */}
        </MapView>
      </SC.Container>
    </SafeAreaView>
  );
};

export default Map;
