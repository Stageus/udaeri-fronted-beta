import React from "react";
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Loading() {
    return (
        <LinearGradient colors={["#ff9933", "#FFC426"]} style={styles.container}>
            <View style={styles.halfContainer}>
                <View stlye={styles.logoImg}>

                </View>
            </View>
            <View style={styles.halfContainer}>
                <Text style={styles.titleText}>우대리</Text>
                <Text style={styles.subText}>우리들의 대학교 거리</Text>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    logoImg: {
        flex: 1,
        backgroundColor: "white",
        borderRadius: 10,
        width: 30,
        height: 30
    },
    halfContainer: {
        flex: 1,
        alignItems: "center"
    },
    titleText: {
        fontFamily: 'SpoqaHanSansNeo-Medium',
        color: "white",
        fontWeight: "500",
        fontSize: 65
    },
    subText: {
        fontFamily: 'SpoqaHanSansNeo-Regular',
        color: "white",
        fontWeight: "300",
        fontSize: 35,
        marginTop: 15
    }
})