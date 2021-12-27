import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Dimensions,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  AntDesign,
  Ionicons,
  FontAwesome,
  Entypo,
  Fontisto,
} from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";

import Home from "../../../Screens/Home";
import Search from "../../../Screens/Search";
import MyPage from "../../../Screens/MyPage";
import JjimPage from "../../../Screens/Jjim";

import type { RouteProp, ParamListBase } from "@react-navigation/native";
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
      const focusColor = focused ? "#ff9933" : "black";
      switch (name) {
        case "Home":
          return (
            <AntDesign
              name="home"
              color={focusColor}
              size={RFPercentage(3.5)}
            />
          );
        case "Search":
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
        name="Search"
        component={Search}
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
