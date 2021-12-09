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
  useEffect(() => {}, [clickedCat]);

  const [initialRegion, setInitialRegion] = useState({
    latitude: 37.4513546060566,
    longitude: 126.65759221275367,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [markers, setMarkers] = useState({
    food: [
      {
        latitude: 37.45181047308198,
        longitude: 126.65688354141875,
        title: "가메이",
      },
      {
        latitude: 37.45133942595257,
        longitude: 126.65938738189837,
        title: "산쪼메",
      },
    ],
    cafe: [
      {
        latitude: 37.451789,
        longitude: 126.654988,
        title: "스타벅스",
      },
    ],
    bar: [
      {
        latitude: 37.45236872360831,
        longitude: 126.65653699724074,
        title: "병헤는 밤",
      },
    ],
  });

  const middleCatFood = [
    { title: "한식" },
    { title: "중식" },
    { title: "일식" },
    { title: "양식" },
    { title: "분식" },
    { title: "아시안" },
    { title: "치킨/피자" },
    { title: "패스트푸드" },
    { title: "기타" },
  ];

  const middleCatCafe = [
    { title: "커피" },
    { title: "베이커리" },
    { title: "스터디카페" },
    { title: "기타" },
  ];

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
            <SC.Category>
              <Text onPress={() => setClickedCat("먹거리")}>먹거리</Text>
            </SC.Category>
            <SC.Category>
              <Text onPress={() => setClickedCat("카페")}>카페</Text>
            </SC.Category>
            <SC.Category>
              <Text onPress={() => setClickedCat("술집")}>술집</Text>
            </SC.Category>
          </ScrollView>
        </SC.LargeCatWrap>
        <View>
          {
            {
              먹거리: <MiddleCatBtnWrap cat={middleCatFood}></MiddleCatBtnWrap>,
              카페: <MiddleCatBtnWrap cat={middleCatCafe}></MiddleCatBtnWrap>,
            }[clickedCat]
          }
        </View>

        <MapView
          initialRegion={initialRegion}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          style={{ flex: 1, width: "100%", height: "100%" }}
        >
          <MapView.Marker
            coordinate={{
              latitude: 37.451789,
              longitude: 126.654988,
            }}
            title="스타벅스"
            description="스타스타스타벅스"
          />
        </MapView>
      </SC.Container>
    </SafeAreaView>
  );
};

export default Map;
