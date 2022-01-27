import React, { useState, useEffect } from "react";
import {
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  Text,
  View,
  Dimensions,
  StyleSheet,
} from "react-native";
import styled, { css } from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import HeaderBar from "../../Components/HeaderBar";
import MiddleCatBtnWrap from "./MiddleCatBtnWrap/index";
import { restoreCurMidCat, restoreCurStore } from "../../../reducer/index";

const StatusBarHeight = StatusBar.currentHeight;
const { width, height } = Dimensions.get("window");

const Map = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const url = useSelector((state) => state.url);
  axios.defaults.baseURL = url;

  const clickedMiddle = useSelector((state) => state.curMidCat);
  const largeCat = useSelector((state) => state.largeCatList);
  const middleCat = useSelector((state) => state.midCatList);
  const mainColor = useSelector((state) => state.mainColor);
  const clickedStore = useSelector((state) => state.curStore);

  const [initialRegion, setInitialRegion] = useState({
    latitude: 37.4513546060566,
    longitude: 126.65759221275367,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
  });

  const [clickedCat, setClickedCat] = useState("");
  const [midCatList, setMidCatList] = useState({});
  const [middleCatLocation, setMiddleCatLocation] = useState([]);
  const [storeInfo, setStoreInfo] = useState({});
  const [target, setTarget] = useState(null);

  useEffect(() => {
    if (clickedCat === "술집") {
      dispatch(restoreCurMidCat("술집"));
    }
  }, [clickedCat]);

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

  useEffect(() => {}, [storeInfo, clickedStore]);
  useEffect(() => {
    dispatch(restoreCurStore(null));
    dispatch(restoreCurMidCat(null));
  }, []);

  const MiddleCatListAPI = (largeCat) => {
    setClickedCat(largeCat);
    setMidCatList(middleCat[largeCat]);
  };

  const getStoreInfo = (storeName) => {
    axios
      .get(
        "/l-categories/" +
          clickedCat +
          "/m-categories/" +
          clickedMiddle +
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

  const handleLargeCatClick = (largeCat) => {
    MiddleCatListAPI(largeCat);
    dispatch(restoreCurStore(null));
    dispatch(restoreCurMidCat(null));
  };

  const handlePinClick = (pinStoreName) => {
    setTarget(pinStoreName);
    getStoreInfo(pinStoreName);
    dispatch(restoreCurStore(pinStoreName));
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#FFFFFF",
        flex: 1,
      }}
    >
      <SC.Container>
        <HeaderBar
          left="arrow"
          title="지도"
          right="magni"
          navigation={navigation}
        ></HeaderBar>
        <SC.LargeCatWrap>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {largeCat.map((item, index) => {
              return (
                <SC.Category
                  key={index}
                  style={styles.shadow}
                  target={item.name}
                  clickedCat={clickedCat}
                  clickedColor={mainColor}
                >
                  <Text onPress={() => handleLargeCatClick(item.name)}>
                    {item.name}
                  </Text>
                </SC.Category>
              );
            })}
          </ScrollView>
        </SC.LargeCatWrap>
        <SC.MidCatWrap>
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
        </SC.MidCatWrap>

        <MapView
          initialRegion={initialRegion}
          provider={PROVIDER_GOOGLE}
          style={{ height: "100%", width: "100%" }}
          // showsUserLocation={true}
          // showsMyLocationButton={true}
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
                  // title={item.store_name}
                  onPress={() => handlePinClick(item.store_name)}
                >
                  {/* <MapView.Callout
                    onPress={() => {
                      navigation.navigate("StorePage", {
                        key: item.store_name,
                      });
                      dispatch(restoreCurStore(item.store_name));
                    }}
                  >
                    <TouchableOpacity>
                      <Text>{item.store_name}</Text>
                    </TouchableOpacity>
                  </MapView.Callout> */}
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
              // dispatch(restoreCurStore(target));
            }}
          >
            <SC.StoreInfoTop>
              <SC.StoreName>{storeInfo.store}</SC.StoreName>
              <SC.StoreCategory>{clickedMiddle}</SC.StoreCategory>
            </SC.StoreInfoTop>

            <SC.StoreInfo>{storeInfo.location}</SC.StoreInfo>
          </SC.StoreWrap>
        ) : (
          <></>
        )}
      </SC.Container>
    </SafeAreaView>
  );
};

export default Map;

const styles = StyleSheet.create({
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 1,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        shadowColor: "#000",
        elevation: 4,
      },
    }),
  },
});

const SC = {
  Container: styled.View`
    background-color: #fff;
    flex: 1;
    ${Platform.OS === "android"
      ? css`
          padding-top: ${StatusBarHeight}px;
        `
      : undefined}
  `,
  Category: styled.View`
    align-items: center;
    justify-content: space-between;
    margin-right: 5px;
    padding: 6px 10px;
    border-radius: 15px;

    ${({ target, clickedCat, clickedColor }) => {
      return target === clickedCat
        ? `background-color: ${clickedColor}`
        : "background-color: #fff";
    }}
  `,
  LargeCatWrap: styled.View`
    position: absolute;
    top: ${StatusBarHeight + height * 0.075}px;
    z-index: 5;
    flex-direction: row;
    justify-content: space-between;
    margin-left: 10px;
  `,
  MidCatWrap: styled.View`
    position: absolute;
    top: ${StatusBarHeight + height * 0.085 + 30}px;
    z-index: 5;
    margin-left: 10px;
  `,
  StoreWrap: styled.TouchableOpacity`
    position: absolute;
    bottom: 0;
    z-index: 5;
    width: 100%;
    height: 100px;
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
