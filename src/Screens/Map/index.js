import React, { useState } from "react";
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
import HeaderBar from "../../Components/HeaderBar";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

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
    width: 50px;
    height: 25px;
    background-color: yellow;
    align-items: center;
    justify-content: space-between;
    margin-right: 15px;
  `,
  LargeCatWrap: styled.View`
    flex-direction: row;
    justify-content: space-between;
  `,
};

const Map = ({ navigation, route }) => {
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
  console.log(markers.food);

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
              <Text>먹거리</Text>
            </SC.Category>
            <SC.Category>
              <Text>카페</Text>
            </SC.Category>
            <SC.Category>
              <Text>술집</Text>
            </SC.Category>
          </ScrollView>
        </SC.LargeCatWrap>

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
