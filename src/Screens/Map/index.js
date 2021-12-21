import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  Text,
  View,
} from "react-native";
import styled, { css } from "styled-components/native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";

import HeaderBar from "../../Components/HeaderBar";
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
  const url = useSelector((state) => state.url);
  axios.defaults.baseURL = url;

  const [location, setLocation] = useState(null); //사용자 현재위치
  const [errorMsg, setErrorMsg] = useState(null); //사용자 현재위치 받아올 때 출력할 에러메시지

  const [clickedCat, setClickedCat] = useState("");

  const clickedMiddle = useSelector((state) => state.curMidCat);
  const largeCat = useSelector((state) => state.largeCatList);
  const middleCat = useSelector((state) => state.midCatList);

  useEffect(() => {}, [clickedCat]);

  const [initialRegion, setInitialRegion] = useState({
    latitude: 37.4513546060566,
    longitude: 126.65759221275367,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [midCatList, setMidCatList] = useState({});
  const [middleCatLocation, setMiddleCatLocation] = useState([]);

  const MiddleCatListAPI = (largeCat) => {
    setClickedCat(largeCat);
    setMidCatList(middleCat[largeCat]);
  };

  useEffect(() => {
    axios
      .get(
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
              먹거리: <MiddleCatBtnWrap cat={midCatList}></MiddleCatBtnWrap>,
              카페: <MiddleCatBtnWrap cat={midCatList}></MiddleCatBtnWrap>,
              놀거리: <MiddleCatBtnWrap cat={midCatList}></MiddleCatBtnWrap>,
              술집: <MiddleCatBtnWrap cat={midCatList}></MiddleCatBtnWrap>,
              서비스: <MiddleCatBtnWrap cat={midCatList}></MiddleCatBtnWrap>,
              상점: <MiddleCatBtnWrap cat={midCatList}></MiddleCatBtnWrap>,
            }[clickedCat]
          }
        </View>

        <MapView
          initialRegion={initialRegion}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          showsMyLocationButton={true}
          style={{ flex: 1, width: "100%" }}
        >
          {middleCatLocation.map((item, index) => {
            return (
              <>
                <MapView.Marker
                  coordinate={{
                    latitude: item.latitude,
                    longitude: item.longitude,
                  }}
                  title={item.store_name}
                />
                <MapView.Marker
                  coordinate={{
                    latitude: 37.4219983,
                    longitude: -122.084 + 360,
                  }}
                />
              </>
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
