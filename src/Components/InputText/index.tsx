import React from 'react';
import { TextInput, Dimensions, StyleSheet } from "react-native";
import styled from 'styled-components/native'

interface Props {
    placeHolder: string;
    type: 'id' | 'pw';
}

const inputText = ({ placeHolder, type }: Props) => {

    const [text, onChangeText] = React.useState<string>("");

    return (
        type == 'pw' ?
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder={placeHolder}
                placeholderTextColor={'#C0C0C0'}
                secureTextEntry={true}
            /> :
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
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
