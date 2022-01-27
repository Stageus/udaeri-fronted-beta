import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface Props {
    nextPage: string;
    navigation: any;
}
const SC = {
    container: styled.TouchableOpacity`
        position : absolute;
        top : ${height * -0.35}px;
        left : -10px;
    `,
}
const Xbtn = ({ nextPage, navigation }: Props) => {
    return (
        <SC.container onPress={() => {
            navigation.reset({ routes: [{ name: nextPage }] })
        }}>
            <Feather name="x" size={20} color={'grey'} />
        </SC.container>
    )
}

export default Xbtn;