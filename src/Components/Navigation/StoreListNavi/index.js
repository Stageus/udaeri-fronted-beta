import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSelector } from "react-redux";

import Store from '../../../Screens/StoreList/Store'
const Tab = createMaterialTopTabNavigator();

const StoreListNavi = (props) => {

    const curLargeCat = useSelector((state) => state.curLargeCat);
    const MidCatList = useSelector((state) => state.midCatList[curLargeCat]);
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
                width: 90,
            },
            activeTintColor: '#ff9933',
            inactiveTintColor: 'gray',

        }}
            initialRouteName={props.title}
            tabBarLabel={{
                focused: false,
            }}
        >
            {MidCatList && MidCatList.map((item) => (
                <Tab.Screen name={item} component={Store} />
            ))}
        </Tab.Navigator>
    );
}

export default StoreListNavi;
