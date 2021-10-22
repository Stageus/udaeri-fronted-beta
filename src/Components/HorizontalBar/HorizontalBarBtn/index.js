import React from 'react';
import styled from 'styled-components/native';

const SC = {
    Container: styled.TouchableOpacity`
    `,
    category: styled.Text`
        margin : 0 15px;
        font-size: 18px;
        font-family : Regular;
        color : #808080;
    `,
}

const HorizontalBarBtn = (props) => {
    return (
        <SC.Container onPress={() => {
            props.navigation.navigate('StoreList', { key: props.category });
        }}>
            <SC.category>
                {props.category}
            </SC.category>
        </SC.Container>
    )
}

export default HorizontalBarBtn