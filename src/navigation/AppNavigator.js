import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import FoodDatabase from '../screens/FoodDatabase';
import HealthScreen from '../screens/HealthScreen';
import MealPlanning from '../screens/MealPlanning';
import WelcomePage from '../screens/WelcomePage';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            position: 'absolute',
            bottom: 5,
            left: 20,
            right: 20,
            elevation: 0,
            borderRadius: 20,
            height: 50,
            display: 'flex',
          },
          null,
        ],
      }}>
      <Tab.Screen
        name="Welcome"
        component={WelcomePage}
        options={{
          tabBarStyle: { display: 'none' },
          tabBarVisible: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Health Goals"
        component={HealthScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="heart" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Food Database"
        component={FoodDatabase}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="fast-food" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Meal Planning"
        component={MealPlanning}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
