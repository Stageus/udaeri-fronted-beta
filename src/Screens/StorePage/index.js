import React from "react";
import { Text, View } from 'react-native';

import styled from 'styled-components/native';

import StoreTapNavigator from '../../Components/Navigation/StoreTabNavi';
import HeaderBar from '../../Components/HeaderBar';

const Container = styled.View`
    flex: 1;
    background-Color: #fff;
`;

const StoreContainer = styled.View`
    flex: 8;
`;


const StorePage = () => {
    return (
        <Container>
            {/* 헤더 */}
            <HeaderBar left="arrow" title="맛사랑" right="heart" />
            {/* 메뉴 바 */}
            <StoreContainer>
                <StoreTapNavigator />
            </StoreContainer>
        </Container>
    )
}

export default StorePage;