import React, { useState, useEffect } from "react";
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { useSelector, useDispatch } from "react-redux";

import StoreEle from '../../../Components/StoreEle';

const SC = {
    Container: styled.View`
    background-color: #ffffff;
    `,
    storeContainer: styled.ScrollView`
        height: auto;
        background-color: #ffffff;
    `
}
const Store = ({ navigation, route }) => {
    const selectedMidCatList = route.params.selectedMidCatList;
    console.log("------------4번------------")
    console.log("받은 리스트" + selectedMidCatList)

    return (
        <SC.storeContainer>
            {selectedMidCatList && selectedMidCatList.map((item) => (
                <StoreEle
                    storeName={item.store_name}
                    content={item.main_menu}
                    location={item.s_name}
                    navigation={navigation}
                />
            ))}
        </SC.storeContainer>
    )
}

export default Store;