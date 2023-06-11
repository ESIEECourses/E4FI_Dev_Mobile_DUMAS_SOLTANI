import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import AppNavigator from './src/navigation/AppNavigator';
import { MealProvider } from './src/screens/MealContext'; // Importez le MealProvider

const App = () => {
  return (
    <MealProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </MealProvider>
  );
};

export default App;
