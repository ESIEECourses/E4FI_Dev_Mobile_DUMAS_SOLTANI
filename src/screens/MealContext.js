import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect } from 'react';

//Context MealContext
export const MealContext = createContext();

//fournisseur de Context MealProvider
export const MealProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);

  // Fonction pour ajouter un repas au Context
  const addMeal = (meal) => {
    setMeals([...meals, meal]);
  };

  // Fonction pour supprimer un repas du Context
  const removeMeal = (mealIndex) => {
    const updatedMeals = [...meals];
    updatedMeals.splice(mealIndex, 1);
    setMeals(updatedMeals);
  };

  // Fonction pour sauvegarder les repas en utilisant AsyncStorage
  const saveMeals = async () => {
    try {
      const mealsJson = JSON.stringify(meals);
      await AsyncStorage.setItem('meals', mealsJson);
    } catch (error) {
      console.log('Erreur lors de la sauvegarde des repas :', error);
    }
  };

  // Sauvegarde des repas lorsque le state meals change
  useEffect(() => {
    saveMeals();
  }, [meals]);

  // Fonction pour charger les repas depuis AsyncStorage
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

  // Chargement des repas lors du montage du composant
  useEffect(() => {
    loadMeals();
  }, []);
  // Valeur du Context fournie aux composants enfants
  const contextValue = {
    meals,
    addMeal,
    removeMeal,
  };

  return <MealContext.Provider value={contextValue}>{children}</MealContext.Provider>;
};
