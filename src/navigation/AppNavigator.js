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
      barStyle={{ backgroundColor: '#47688D' }}
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: '#47688D',
        tabBarInactiveBackgroundColor: '#47688D',
        tabBarStyle: [
          {
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
