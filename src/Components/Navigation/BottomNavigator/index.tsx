import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";

import Home from "../../../Screens/Home";
import RecentSearch from "../../../Screens/Search/RecentSearch";
import MyPage from "../../../Screens/MyPage";
import JjimPage from "../../../Screens/Jjim";

import type { RouteProp, ParamListBase } from "@react-navigation/native";
import { useSelector } from "react-redux";
type TabBarIconProps = { focused: boolean; color: string; size: number };

const screenOptions = ({
  route,
}: {
  route: RouteProp<ParamListBase, string>;
}) => {
  return {
    headerShown: false,
    tabBarIcon: ({ focused, color, size }: TabBarIconProps) => {
      const { name } = route;
      const mainColor = useSelector((state) => state.mainColor);
      const focusColor = focused ? mainColor : "black";
      switch (name) {
        case "Home":
          return (
            <AntDesign
              name="home"
              color={focusColor}
              size={RFPercentage(3.5)}
            />
          );
        case "RecentSearch":
          return (
            <Ionicons
              name="ios-search-outline"
              color={focusColor}
              size={RFPercentage(3.5)}
            />
          );
        case "JjimPage":
          return (
            <Ionicons
              name="heart-circle-sharp"
              color={focusColor}
              size={RFPercentage(3.5)}
            />
          );
        case "MyPage":
          return (
            <Ionicons
              name="ios-person-outline"
              color={focusColor}
              size={RFPercentage(3.5)}
            />
          );
      }
    },
  };
};

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ tabBarShowLabel: false }}
      />
      <Tab.Screen
        name="RecentSearch"
        component={RecentSearch}
        options={{ tabBarShowLabel: false }}
      />
      <Tab.Screen
        name="JjimPage"
        component={JjimPage}
        options={{ tabBarShowLabel: false }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{ tabBarShowLabel: false }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
