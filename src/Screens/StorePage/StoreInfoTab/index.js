import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import styled from "styled-components/native";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { FontAwesome, Fontisto } from "@expo/vector-icons";
import StoreInfoEle from "../../../Components/StoreInfoEle";

const StoreInfoTap = () => {
  const curLargeCat = useSelector((state) => state.curLargeCat);
  const curMidCat = useSelector((state) => state.curMidCat);
  const curStore = useSelector((state) => state.curStore);
  const mainColor = useSelector((state) => state.mainColor);
  const [storeInfo, setStoreInfo] = useState({});
  const [initialRegion, setInitialRegion] = useState({});
  const [coordinate, setCoordinate] = useState({ latitude: 0, longitude: 0 });
  useEffect(() => {
    axios
      .get(
        "/l-categories/" +
          curLargeCat +
          "/m-categories/" +
          curMidCat +
          "/stores/" +
          curStore +
          "/information"
      )
      .then((res) => {
        console.log("가게정보: " + JSON.stringify(res.data));
        setStoreInfo(res.data);
        setCoordinate({
          latitude: res.data.latitude,
          longitude: res.data.longitude,
        });
        setInitialRegion({
          latitude: res.data.latitude + 0.001,
          longitude: res.data.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      })
      .catch((err) => {
        console.log("error");
        console.log(err);
      });
  }, []);

  return (
    <SC.Container>
      <SC.storeName>{storeInfo.store}</SC.storeName>
      <StoreInfoEle infoTitle="전화번호" infoContent={storeInfo.call_number} />
      <StoreInfoEle
        infoTitle="휴무일/영업시간"
        infoContent={
          storeInfo.day_off +
          " / " +
          storeInfo.opening_hours +
          " ~ " +
          storeInfo.opening_hours
        }
      />
      <StoreInfoEle infoTitle="가격대" infoContent={storeInfo.prices} />
      <StoreInfoEle infoTitle="주소" infoContent={storeInfo.location} />
      <SC.storeInfoWrap>
        <SC.storeInfoTitle>지도</SC.storeInfoTitle>
      </SC.storeInfoWrap>
      <MapView
        initialRegion={initialRegion}
        provider={PROVIDER_GOOGLE}
        style={{ width: "100%", height: "25%" }}
      >
        <MapView.Marker
          coordinate={coordinate}
          style={{ alignItems: "center" }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              padding: 7,
              marginBottom: 5,
              borderRadius: 5,
            }}
          >
            <Text style={{ fontSize: 12 }}>{storeInfo.store}</Text>
          </View>

          <Fontisto name="map-marker-alt" size={30} color="#3366ff" />
        </MapView.Marker>
      </MapView>
    </SC.Container>
  );
};

const SC = {
  Container: styled.View`
    flex: 1;
    background-color: #ffffff;
    padding: 25px;
  `,
  storeName: styled.Text`
    font-family: Bold;
    font-size: 20px;
    margin-bottom: 15px;
  `,
  storeInfoWrap: styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 10px;
  `,
  storeInfoTitle: styled.Text`
    font-family: Regular;
    font-size: 16px;
    color: gray;
  `,
  storeInfoText: styled.Text`
    font-family: Medium;
    font-size: 16px;
    color: gray;
  `,
};

export default StoreInfoTap;
