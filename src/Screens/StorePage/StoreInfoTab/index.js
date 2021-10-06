import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';

import StoreInfoEle from '../../../Components/StoreInfoEle';

const StoreInfoTap = () => {
    const storeInfo =
    {
        storeName: "맛사랑",
        storeTel: "032-860-1234",
        storeDayOff: '매일',
        storeOpenTime: '09:00',
        storeCloseTime: '20:00',
        storePriceRange: '1만원 이하',
        storeLoaction: '인천광역시 미추홀구 인주대로 123번길 20'
    }

    return (
        <SC.Container>
            <SC.storeName>{storeInfo.storeName}</SC.storeName>
            <StoreInfoEle infoTitle="전화번호" infoContent={storeInfo.storeTel} />
            <StoreInfoEle infoTitle="휴무일/영업시간" infoContent={storeInfo.storeDayOff + " / " + storeInfo.storeOpenTime + " ~ " + storeInfo.storeCloseTime} />
            <StoreInfoEle infoTitle="가격대" infoContent={storeInfo.storePriceRange} />
            <StoreInfoEle infoTitle="주소" infoContent={storeInfo.storeLoaction} />
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
        font-Size: 12px;
        color: gray;
    `,
    storeInfoText: styled.Text`
        font-Family: Meduim;
        font-Size: 12px;
        color: gray;
    `
}

export default StoreInfoTap;
