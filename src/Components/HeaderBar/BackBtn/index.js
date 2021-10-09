import React from 'react';
import { Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BackBtn = (props) => {

    return (

        <Ionicons name="arrow-back" size={24} color="gray" onPress={() => { props.navigation.goBack() }}>
        </Ionicons>
    )
}

export default BackBtn;
