import React from "react";
import { StyleSheet, Text, View, StatusBar, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons, Entypo, MaterialIcons, FontAwesome, AntDesign } from '@expo/vector-icons';
import styled from 'styled-components/native';
import HeaderBar from '../../Components/HeaderBar';
import MiddleCatList from '../../Components/MiddleCatList';

const SC = {
    Container: styled.View`
        flex : 1;
    `,
    mainContainer: styled.ScrollView`
    `,

}

const LargeCat = () => {
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
        <SC.Container>
            <HeaderBar left="arrow" title={middleCatList[0].category} right="magni" />

            <SC.mainContainer>
                {middleCatList.map((item) => (
                    <MiddleCatList name={item.category} />
                ))}
            </SC.mainContainer>
            <View style={styles.navBar}>
                <View style={styles.homeBtn, styles.navBarBtn}>
                    <Ionicons style={styles.choice} name="ios-home-outline" size={36} color="gray" />
                    <Text style={styles.navBarText, styles.choice}>홈</Text>
                </View>
                <View style={styles.magniBtn, styles.navBarBtn}>
                    <Entypo name="magnifying-glass" size={36} color="gray" />
                    <Text style={styles.navBarText}>검색</Text>
                </View>
                <View style={styles.heartBtn, styles.navBarBtn}>
                    <Ionicons name="ios-heart-circle-outline" size={36} color="gray" />
                    <Text style={styles.navBarText}>단골 가게</Text>
                </View>
                <View style={styles.myinfoBtn, styles.navBarBtn}>
                    <FontAwesome name="user-o" size={36} color="gray" />
                    <Text style={styles.navBarText}>내 정보</Text>
                </View>
            </View>
        </SC.Container>
    )
}

export default LargeCat;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerBar: {
        flex: 0.7,
        marginTop: 20,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "space-between",
    },
    largeCatTitle: {
        fontFamily: 'SpoqaHanSansNeo-Bold',
        fontSize: 20
    },
    mainContainer: {
        flex: 8,
    },
    middleCategories: {
        height: 50,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    middleCatTitle: {
        fontFamily: 'SpoqaHanSansNeo-Thin',
    },
    info: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    thumbnail: {
        backgroundColor: "#ff9933",
        width: Dimensions.get('window').width * 0.1,
        height: Dimensions.get('window').width * 0.1,
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: Dimensions.get('window').width * 0.1,
        marginRight: 15,
    },
    navBar: {
        flex: 1.2,
        backgroundColor: "white",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderColor: "lightgray",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowOpacity: 0.19,
        shadowRadius: 8.30,
        elevation: 7,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-around',
        textAlign: 'center'
    },
    navBarBtn: {
        textAlign: 'center'
    },
    navBarText: {
        fontSize: 10,
        color: 'gray',
        textAlign: 'center',
        fontFamily: 'SpoqaHanSansNeo-Regular',
    },
    mgH: {
        marginHorizontal: 20
    },
    choice: {
        color: '#FFC426',
        textAlign: 'center'
    }
})