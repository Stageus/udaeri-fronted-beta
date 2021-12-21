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
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import HeaderBar from "../../Components/HeaderBar";
import MiddleCatBtnWrap from "./MiddleCatBtnWrap/index";
import { restoreCurMidCat } from "../../../reducer/index";

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
  const dispatch = useDispatch();
  const url = useSelector((state) => state.url);
  axios.defaults.baseURL = url;

  const clickedMiddle = useSelector((state) => state.curMidCat);
  const largeCat = useSelector((state) => state.largeCatList);
  const middleCat = useSelector((state) => state.midCatList);

  const [initialRegion, setInitialRegion] = useState({
    latitude: 37.4513546060566,
    longitude: 126.65759221275367,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [clickedCat, setClickedCat] = useState("");
  const [midCatList, setMidCatList] = useState({});
  const [middleCatLocation, setMiddleCatLocation] = useState([]);

  useEffect(() => {
    if (clickedCat === "술집") {
      dispatch(restoreCurMidCat("술집"));
    }
  }, [clickedCat]);

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
                <SC.Category key={index}>
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
              술집: <></>,
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
                  key={index}
                  coordinate={{
                    latitude: item.latitude,
                    longitude: item.longitude,
                  }}
                  title={item.store_name}
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
