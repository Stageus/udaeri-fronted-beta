import React from 'react';
import { TextInput, Dimensions, StyleSheet } from "react-native";
import styled from 'styled-components/native'

interface Props {
    placeHolder: string;
    type: 'id' | 'pw';
    value: string;
    getValue: () => void;
}

const inputText = ({ placeHolder, type, value, getValue }: Props) => {

    return (
        type == 'pw' ?
            <TextInput
                style={styles.input}
                onChangeText={getValue}
                value={value}
                placeholder={placeHolder}
                placeholderTextColor={'#C0C0C0'}
                secureTextEntry={true}
            /> :
            <TextInput
                style={styles.input}
                onChangeText={getValue}
                value={value}
                placeholder={placeHolder}
                placeholderTextColor={'#C0C0C0'}
            />
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        width: Dimensions.get('window').width * 0.7,
        margin: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#C0C0C0',
        padding: 10,
        fontFamily: 'Medium',
        fontSize: 16,
        color: '#C0C0C0'
    }
});


export default inputText;
