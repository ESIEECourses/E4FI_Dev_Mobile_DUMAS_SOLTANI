import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import FoodDatabase from '../screens/FoodDatabase';
import HealthScreen from '../screens/HealthScreen';
import MealPlanning from '../screens/MealPlanning';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Health Goals" component={HealthScreen} />
      <Tab.Screen name="Food Database" component={FoodDatabase} />
      <Tab.Screen name="Meal Planning" component={MealPlanning} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
