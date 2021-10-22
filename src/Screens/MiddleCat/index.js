import React from "react";
import { SafeAreaView, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import HeaderBar from '../../Components/HeaderBar';
import CatEle from '../../Components/CatEle';


const SC = {
    Container: styled.View`
        background-color: #ffffff;
    `,
    mainContainer: styled.View`
        height : 100%;
    `,
}

const MiddleCat = ({ navigation, route }) => {
    const middleCatList = [
        { category: "한식" },
        { category: "분식" },
        { category: "양식" },
        { category: "일식" },
        { category: "중식" },
        { category: "피자" },
        { category: "치킨" },
        { category: "찜/탕" },
    ]

    return (
        <SafeAreaView>
            <SC.Container>
                <HeaderBar left="arrow" title="먹거리" right="magni" navigation={navigation} />

                <SC.mainContainer>
                    <ScrollView>
                        {middleCatList.map((item) => (
                            <CatEle name={item.category} icon={<></>} navi={navigation} />
                        ))}
                    </ScrollView>
                </SC.mainContainer>
            </SC.Container>
        </SafeAreaView>
    )
}
export default MiddleCat;