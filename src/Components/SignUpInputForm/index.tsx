import React from 'react'
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const { width, height } = Dimensions.get('window');

const SC = {
    container: styled.View`
        display : flex;
        margin-bottom: 40px;
    `,
    formInput: styled.TextInput`
        width : ${width * 0.8}px;
        border-bottom-width : 0.5px;
        font-family : 'Regular';
        font-size : 20px;
    `
}

interface Props {
    placeHolder: string;
    type: 'text' | 'pw' | 'phone';
}

const SignUpInputForm = ({ placeHolder, type }: Props) => {
    const [text, onChangeText] = React.useState<string>("");

    return (
        <SC.container>
            {
                type === 'pw' ?
                    <SC.formInput
                        onChangeText={onChangeText}
                        value={text}
                        placeholder={placeHolder}
                        placeholderTextColor={'#c0c0c0'}
                        secureTextEntry={true}
                    /> : type === 'phone' ?
                        <SC.formInput
                            onChangeText={onChangeText}
                            value={text}
                            placeholder={placeHolder}
                            keyboardType={'phone-pad'}
                            placeholderTextColor={'#c0c0c0'}
                        /> :
                        <SC.formInput
                            onChangeText={onChangeText}
                            value={text}
                            placeholder={placeHolder}
                            placeholderTextColor={'#c0c0c0'}
                        />
            }
        </SC.container>
    )
}

export default SignUpInputForm;