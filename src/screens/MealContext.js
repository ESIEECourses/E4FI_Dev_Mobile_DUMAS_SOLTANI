import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect } from 'react';

// Créez le contexte MealContext
export const MealContext = createContext();

// Créez le fournisseur de contexte MealProvider
export const MealProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);

  // Fonction pour ajouter un repas au contexte
  const addMeal = (meal) => {
    setMeals([...meals, meal]);
  };

  // Fonction pour supprimer un repas du contexte
  const removeMeal = (mealIndex) => {
    const updatedMeals = [...meals];
    updatedMeals.splice(mealIndex, 1);
    setMeals(updatedMeals);
  };

  const saveMeals = async () => {
    try {
      const mealsJson = JSON.stringify(meals);
      await AsyncStorage.setItem('meals', mealsJson);
    } catch (error) {
      console.log('Erreur lors de la sauvegarde des repas :', error);
    }
  };

  // Utilisez useEffect pour appeler saveMeals chaque fois que meals change
  useEffect(() => {
    saveMeals();
  }, [meals]);

  const loadMeals = async () => {
    try {
      const mealsJson = await AsyncStorage.getItem('meals');
      if (mealsJson) {
        const mealsData = JSON.parse(mealsJson);
        setMeals(mealsData);
      }
    } catch (error) {
      console.log('Erreur lors du chargement des repas :', error);
    }
  };

  // Utilisez useEffect pour charger les repas une fois au montage du composant
  useEffect(() => {
    loadMeals();
  }, []);
  // Valeur fournie par le contexte
  const contextValue = {
    meals,
    addMeal,
    removeMeal,
  };

  return <MealContext.Provider value={contextValue}>{children}</MealContext.Provider>;
};
