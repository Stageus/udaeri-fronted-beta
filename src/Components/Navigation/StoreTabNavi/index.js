import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import StoreInfoTab from '../../../Screens/StorePage/StoreInfoTab';
import StoreMenuTab from '../../../Screens/StorePage/StoreMenuTab';
import StoreReviewTab from '../../../Screens/StorePage/StoreReviewTab';

const Tab = createMaterialTopTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator tabBarOptions={{
            labelStyle: {
                fontSize: 12,
                fontFamily: 'Medium',
            },
            indicatorStyle: {
                borderColor: '#ff9933',
                borderWidth: 2
            }
        }}>

            <Tab.Screen name="정보" component={StoreInfoTab} />
            <Tab.Screen name="메뉴" component={StoreMenuTab} />
            <Tab.Screen name="리뷰" component={StoreReviewTab} />
        </Tab.Navigator>
    );
}

const StoreTapNavigator = () => {
    return (
        <NavigationContainer>
            <Tabs />
        </NavigationContainer>
    );
}

export default StoreTapNavigator;
