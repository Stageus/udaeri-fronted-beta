import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
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
    background-color: yellow;
    align-items: center;
    justify-content: space-between;
    margin-right: 5px;
    padding: 6px 10px;
    border-radius: 15px;
  `,
  LargeCatWrap: styled.View`
    position: absolute;
    top: ${StatusBarHeight + height * 0.06}px;
    z-index: 5;
    flex-direction: row;
    justify-content: space-between;
  `,
  ShopWrap: styled.TouchableOpacity`
    position: absolute;
    bottom: 0;
    z-index: 5;
    width: 100%;
    height: 100px;
    background-color: pink;
    // border-top-left-radius: 30px;
    // border-top-right-radius: 30px;
    padding: 10px;
  `,
};

const Map = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const url = useSelector((state) => state.url);
  axios.defaults.baseURL = url;

  const clickedMiddle = useSelector((state) => state.curMidCat);
  const largeCat = useSelector((state) => state.largeCatList);
  const middleCat = useSelector((state) => state.midCatList);
  const mainColor = useSelector((state) => state.mainColor);

  const [initialRegion, setInitialRegion] = useState({
    latitude: 37.4513546060566,
    longitude: 126.65759221275367,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const [clickedCat, setClickedCat] = useState("");
  const [midCatList, setMidCatList] = useState({});
  const [middleCatLocation, setMiddleCatLocation] = useState([]);
  const [clickShop, setClickShop] = useState(false);
  const [clickedShopInfo, setClickedShopInfo] = useState();

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
                <SC.Category key={index} style={styles.shadow}>
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
                  // title={item.store_name}
                  onPress={() => {
                    setClickShop(true), setClickedShopInfo(item.store_name);
                  }}
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
                  <FontAwesome name="map-marker" size={30} color={mainColor} />
                </MapView.Marker>
              </>
            );
          })}
        </MapView>
        {clickShop ? (
          <SC.ShopWrap
            onPress={() => {
              navigation.navigate("StorePage", {
                key: clickedShopInfo,
              });
              dispatch(restoreCurStore(clickedShopInfo));
            }}
          >
            <Text>{clickedShopInfo}</Text>
          </SC.ShopWrap>
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
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});
