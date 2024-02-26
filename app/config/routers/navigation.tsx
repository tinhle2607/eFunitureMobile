import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
  HomeStackNavigator,
  ProfileStackNavigator,
  CartStackNavigator,
  AppointmentStackNavigator,
} from "../stacks";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "HomeStack") {
            iconName = "home";
          } else if (route.name === "ProfileStack") {
            iconName = "person";
          } else if (route.name === "CartStack") {
            iconName = "shopping-cart";
          } else if (route.name === "AppointmentStack") {
            iconName = "event-note";
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name="CartStack" component={CartStackNavigator} />
      <Tab.Screen
        name="AppointmentStack"
        component={AppointmentStackNavigator}
      />

      <Tab.Screen name="ProfileStack" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
};
export default BottomTabNavigator;
