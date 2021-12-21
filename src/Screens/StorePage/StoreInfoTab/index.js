import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import axios from "axios";
import StoreInfoEle from '../../../Components/StoreInfoEle';

const StoreInfoTap = () => {
    const curLargeCat = useSelector((state) => state.curLargeCat);
    const curMidCat = useSelector((state) => state.curMidCat);
    const curStore = useSelector((state) => state.curStore);
    const [storeInfo, setStoreInfo] = useState({});
    useEffect(() => {
        const getStore = async () => {
            await axios
                .get("/l-categories/" + curLargeCat + "/m-categories/" + curMidCat + "/stores/" + curStore + "/information")
                .then((res) => {
                    setStoreInfo(res.data);
                })
                .catch((err) => {
                    console.log("error");
                    console.log(err);
                });
        }
        getStore();
    }, [])
    return (
        <SC.Container>
            <SC.storeName>{storeInfo.store}</SC.storeName>
            <StoreInfoEle infoTitle="전화번호" infoContent={storeInfo.call_number} />
            <StoreInfoEle infoTitle="휴무일/영업시간" infoContent={storeInfo.day_off + " / " + storeInfo.opening_hours + " ~ " + storeInfo.opening_hours} />
            <StoreInfoEle infoTitle="가격대" infoContent={storeInfo.prices} />
            <StoreInfoEle infoTitle="주소" infoContent={storeInfo.location} />
            <SC.storeInfoWrap>
                <SC.storeInfoTitle>지도</SC.storeInfoTitle>
            </SC.storeInfoWrap>
        </SC.Container>
    );
}

const SC = {
    Container: styled.View`
        flex: 1;
        background-color: #FFFFFF;
        padding: 25px;
    `,
    storeName: styled.Text`
        font-family: Bold;
        font-size: 20px;
        margin-bottom: 15px;
    `,
    storeInfoWrap: styled.View`
        flex-Direction: row;
        justify-Content: space-between;
        margin-Bottom: 10px;
    `,
    storeInfoTitle: styled.Text`
        font-Family: Regular;
        font-Size: 16px;
        color: gray;
    `,
    storeInfoText: styled.Text`
        font-Family: Medium;
        font-Size: 16px;
        color: gray;
    `
}

export default StoreInfoTap;
