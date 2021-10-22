import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Store from '../../../Screens/StoreList/Store'
const Tab = createMaterialTopTabNavigator();

const StoreListNavi = (props) => {

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

    return (
        <Tab.Navigator tabBarOptions={{
            labelStyle: {
                fontSize: 14,
                fontFamily: 'Medium',
            },
            indicatorStyle: {
                borderColor: '#ff9933',
                borderWidth: 1
            },
            scrollEnabled: true,
            tabStyle: {
                width: 55,
            },
            activeTintColor: '#ff9933',
            inactiveTintColor: 'gray',

        }}
            initialRouteName={props.title}
            tabBarLabel={{
                focused: false,
            }}
        >
            {MiddleCatList.map((item) => (
                <Tab.Screen name={item.category} component={Store} />
            ))}
        </Tab.Navigator>
    );
}

export default StoreListNavi;
