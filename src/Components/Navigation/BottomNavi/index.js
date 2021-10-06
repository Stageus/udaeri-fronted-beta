import React from 'react';
// import 'react-native-gesture-handler';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { AntDesign, Ionicons, FontAwesome, Entypo, Fontisto } from '@expo/vector-icons';
import { RFPercentage } from "react-native-responsive-fontsize";

import Home from '../screens/Home';
import Search from '../screens/Search';
import MyPage from '../screens/MyPage';


const Tab = createBottomTabNavigator();



const BottomNavigator = () => {

    // const bottomNavigation = [
    //   {icon:<AntDesign name="home" style={styles.naviIcon} color="black" />, name:'홈', onTouch: onPressMain},
    //   {icon:<Ionicons name="ios-search-outline" style={styles.naviIcon} color="black" />, name:'검색', onTouch: onPressSearch},
    //   {icon:<Entypo name="heart-outlined" style={styles.naviIcon} color="black" />, name:'찜', onTouch:onPressSearch},
    //   {icon:<Ionicons name="ios-person-outline" style={styles.naviIcon} color="black" />, name:'내 정보', onTouch:onPressMyPage},
    // ];

    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Home">
                <Tab.Screen name="Home" component={Home}
                    options={{
                        headerShown: false,
                        // tabBarIcon: <AntDesign name="home" style={styles.naviIcon} color="black" />
                    }}
                    tabBarOptions={{ showLabel: false }}
                />
                <Tab.Screen name="Search" component={Search}
                    options={{
                        headerShown: false,
                        // tabBarIcon: <Ionicons name="ios-search-outline" style={styles.naviIcon} color="black" />
                    }}
                    tabBarOptions={{ showLabel: false }}
                />
                <Tab.Screen name="MyPage" component={MyPage}
                    options={{
                        headerShown: false,
                        // tabBarIcon:<Ionicons name="ios-person-outline" style={styles.naviIcon} color="black" />
                    }}
                    tabBarOptions={{ showLabel: false }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default BottomNavigator;



const styles = StyleSheet.create({
    bottom: {
        flex: 1,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 25,
        borderWidth: 2,
        borderColor: "#EBEDEF",

        // box shadow
        // shadowColor: '#000000',
        // shadowOpacity: 0.27,
        // shadowRadius: 4.65,
        // shadowOffset: {
        //   width: 0,
        //   height: 3,
        // },
        // elevation: 3,
    },
    naviIcon: {
        fontSize: RFPercentage(3.5)
    },
})