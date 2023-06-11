import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import { MealContext } from './MealContext';

const MealPlanning = () => {
  const { meals, addMeal, removeMeal } = useContext(MealContext);
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
          foods: [meal.name],
        });
      } else {
        uniqueMeals[existingMealIndex].foods.push(meal.name);
      }
    });

    return uniqueMeals;
  };

  const calculateTotalCalories = (day) => {
    const mealsOfDay = meals.filter((meal) => meal.day === day);

    let totalCalories = 0;
    mealsOfDay.forEach((meal) => {
      totalCalories += meal.calories;
    });

    return totalCalories;
  };

  const handleAddFood = () => {
    navigation.navigate('Food Database');
  };

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
          (day) => (
            <View key={day} style={styles.dayItem}>
              <Text style={styles.dayTitle}>{day}</Text>

              <View style={styles.mealContainer}>
                {getUniqueMealsByDayAndType().map((meal, index) => {
                  if (meal.day === day) {
                    return (
                      <View key={index} style={styles.mealContainer}>
                        <Text style={styles.mealType}>{meal.mealType}</Text>
                        <View style={styles.foodList}>
                          {meal.foods.map((food, foodIndex) => (
                            <View key={foodIndex} style={styles.foodItem}>
                              <Text>{food}</Text>
                              <TouchableOpacity
                                onPress={() => handleRemoveFood(food)}
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
                Total Calories: {calculateTotalCalories(day)}
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
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dayContainer: {
    flex: 1,
  },
  dayItem: {
    marginBottom: 20,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mealContainer: {
    paddingLeft: 20,
  },
  mealType: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
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
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  totalCalories: {
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default MealPlanning;
