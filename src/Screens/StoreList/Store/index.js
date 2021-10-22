import React from "react";
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';

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
const StoreListPage = ({ navigation, route }) => {

    const StoreList = [
        { storeName: "맛사랑", content: "제육볶음 6,000 / 순두부찌개 6,000", location: "후문", distance: "350m", likes: 33 },
        { storeName: "탄포포", content: "로스카츠 8,000 / 히레카츠 7,000", location: "후문", distance: "224m", likes: 21 },
        { storeName: "준호네 부대찌개", content: "부대찌개 6,000", location: "후문", distance: "422m", likes: 12 },
        { storeName: "영종식당", content: "제육볶음(2인분) 12,000", location: "후문", distance: "123m", likes: 22 },
        { storeName: "닭살쀼", content: "목삽겸 14,000 / 전기구이통닭 12,000", location: "후문", distance: "552m", likes: 11 },
        { storeName: "모모3", content: "우리집", location: "후문", distance: "679m", likes: 93 },
        { storeName: "스테이지 어스", content: "개발자 맛집", location: "후문", distance: "10m", likes: 999 },
        { storeName: "마약집", content: "곱도리탕 1인분 12,000", location: "후문", distance: "500m", likes: 51 },
        { storeName: "화장실", content: "급함", location: "정문", distance: "1Km", likes: 1 },
    ]
    return (
        <SC.storeContainer>
            <ScrollView>
                {StoreList.map((item) => (
                    <StoreEle
                        storeName={item.storeName}
                        content={item.content}
                        location={item.location}
                        distance={item.distance}
                        likes={item.likes}
                        navigation={navigation}
                    />
                ))}
            </ScrollView>
        </SC.storeContainer>


    )
}

export default StoreListPage;