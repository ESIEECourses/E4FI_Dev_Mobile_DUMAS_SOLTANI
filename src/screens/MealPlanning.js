import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import { MealContext } from './MealContext';

const MealPlanning = () => {
  const { meals, removeMeal } = useContext(MealContext);
  const navigation = useNavigation();

  const getUniqueMealsByDayAndType = () => {
    const uniqueMeals = [];

    meals.forEach((meal) => {
      const existingMealIndex = uniqueMeals.findIndex(
        (m) => m.day === meal.day && m.mealType === meal.mealType
      );

      if (existingMealIndex === -1) {
        uniqueMeals.push({
          day: meal.day,
          mealType: meal.mealType,
          foods: [{ name: meal.name, quantity: meal.quantity, calories: meal.calories }],
        });
      } else {
        uniqueMeals[existingMealIndex].foods.push({
          name: meal.name,
          quantity: meal.quantity,
          calories: meal.calories,
        });
      }
    });

    return uniqueMeals;
  };

  // Calculer le total de calories pour un jour donné
  const calculateTotalCalories = (day) => {
    const mealsOfDay = meals.filter((meal) => meal.day === day);

    let totalCalories = 0;
    mealsOfDay.forEach((meal) => {
      totalCalories += meal.calories * meal.quantity;
    });

    return totalCalories;
  };

  // Retour à la page FoodDatabase
  const handleAddFood = () => {
    navigation.navigate('Food Database');
  };

  // Gestion de la suppression d'un aliment
  const handleRemoveFood = (meal) => {
    const mealIndex = meals.findIndex((m) => m.name === meal);
    if (mealIndex !== -1) {
      removeMeal(mealIndex);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={handleAddFood} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Food</Text>
      </TouchableOpacity>

      <View style={styles.dayContainer}>
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(
          (day, index) => (
            <View key={day} style={[styles.dayItem, index > 0 && styles.borderTop]}>
              <Text style={styles.dayTitle}>{day}</Text>

              <View style={styles.mealContainer}>
                {getUniqueMealsByDayAndType().map((meal, mealIndex) => {
                  if (meal.day === day) {
                    return (
                      <View key={mealIndex} style={styles.mealContainer}>
                        <Text style={styles.mealType}>{meal.mealType}</Text>
                        <View style={styles.foodList}>
                          {meal.foods.map((food, foodIndex) => (
                            <View key={foodIndex} style={styles.foodItem}>
                              <Text style={styles.foodText}>
                                {food.name} ({food.quantity})
                              </Text>
                              <TouchableOpacity
                                onPress={() => handleRemoveFood(food.name)}
                                style={styles.removeButton}>
                                <Text style={styles.removeButtonText}>Remove</Text>
                              </TouchableOpacity>
                            </View>
                          ))}
                        </View>
                      </View>
                    );
                  }
                  return null;
                })}
              </View>

              <Text style={styles.totalCalories}>
                Total Calories: {calculateTotalCalories(day).toFixed(2)}
              </Text>
            </View>
          )
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#364f6b',
  },
  dayContainer: {
    flex: 1,
  },
  dayItem: {
    marginBottom: 20,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: 'white',
    paddingTop: 10,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  mealContainer: {
    paddingLeft: 20,
  },
  mealType: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  foodList: {
    marginTop: 5,
  },
  foodItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  foodText: {
    color: 'white',
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white',
  },
  addButton: {
    backgroundColor: 'green',
    padding: 5,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  totalCalories: {
    marginTop: 10,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default MealPlanning;
