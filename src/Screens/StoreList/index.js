import React from "react";
import { StyleSheet, Text, View, StatusBar, ScrollView, Dimensions, TouchableOpacity } from 'react-native';

import HeaderBar from '../../Components/HeaderBar';
import HorizontalBar from '../../Components/HorizontalBar';
import StoreEle from '../../Components/StoreEle';

const StoreListPage = () => {
    const MiddleCatList = [
        { category: "한식" },
        { category: "분식" },
        { category: "양식" },
        { category: "일식" },
        { category: "중식" },
        { category: "피자" },
        { category: "치킨" },
        { category: "찜/탕" },
    ]

    const StoreList = [
        { storeName: "맛사랑", content: "제육볶음 6,000 / 순두부찌개 6,000", location: "후문", distance: "350m", likes: 33 },
        { storeName: "맛사랑", content: "제육볶음 6,000 / 순두부찌개 6,000", location: "후문", distance: "350m", likes: 33 },
        { storeName: "맛사랑", content: "제육볶음 6,000 / 순두부찌개 6,000", location: "후문", distance: "350m", likes: 33 },
        { storeName: "맛사랑", content: "제육볶음 6,000 / 순두부찌개 6,000", location: "후문", distance: "350m", likes: 33 },
        { storeName: "맛사랑", content: "제육볶음 6,000 / 순두부찌개 6,000", location: "후문", distance: "350m", likes: 33 },
        { storeName: "맛사랑", content: "제육볶음 6,000 / 순두부찌개 6,000", location: "후문", distance: "350m", likes: 33 },
        { storeName: "맛사랑", content: "제육볶음 6,000 / 순두부찌개 6,000", location: "후문", distance: "350m", likes: 33 },
        { storeName: "맛사랑", content: "제육볶음 6,000 / 순두부찌개 6,000", location: "후문", distance: "350m", likes: 33 },
        { storeName: "맛사랑", content: "제육볶음 6,000 / 순두부찌개 6,000", location: "후문", distance: "350m", likes: 33 },
    ]

    return (
        <View style={styles.container}>
            {/* 헤더 */}
            <HeaderBar left="arrow" title="한식" right="magni" />

            {/* 분류 카테고리 */}
            <HorizontalBar catList={MiddleCatList} curCat={MiddleCatList[0].category} />

            {/* 가게 리스트 */}
            <View style={styles.storeContainer}>
                <ScrollView>
                    {StoreList.map((item) => (
                        <StoreEle storeName={item.storeName} content={item.content} location={item.location} distance={item.distance} likes={item.likes} />
                    ))}
                </ScrollView>
            </View>
        </View>
    )
}

export default StoreListPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerBar: {
        flex: 0.7,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20
    },
    MiddleCatTitle: {
        fontFamily: 'Bold',
        fontSize: 20
    },
    middleCatBar: {
        flex: 0.5,
        alignContent: 'center',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderStyle: 'solid',
        borderColor: '#D8DEDE'
    },
    middleCatList: {
        marginHorizontal: 15,
        fontFamily: 'Regular'
    },
    storeContainer: {
        flex: 8,
    },
    storeEleWrap: {
        flex: 1,
        flexDirection: 'row',
        padding: 15,
        borderBottomColor: 'gray',
        borderStyle: 'solid',
        borderBottomWidth: 0.5,
        alignItems: 'center'
    },
    storeThumbnail: {
        backgroundColor: "#ff9933",
        width: Dimensions.get('window').width * 0.1,
        height: Dimensions.get('window').width * 0.1,
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: Dimensions.get('window').width * 0.1,
        marginRight: 20,
    },
    contentWrap: {
        flexDirection: 'column'
    },
    storeName: {
        fontFamily: 'Medium',
        fontSize: 15
    },
    storeContent: {
        fontFamily: 'Regular',
        fontsize: 10
    },
    storeLocationWrap: {
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center"
    },
    location: {
        marginRight: 5
    },
    storeDistance: {
        marginRight: 5
    }
})