import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  StyleSheet,
} from 'react-native';
import ModalSelector from 'react-native-modal-selector';

import { MealContext } from './MealContext';

const FoodDatabase = ({ navigation }) => {
  const APP_ID = '7d6ec309';
  const APP_KEY = 'c242b362495c4bdc1e177f74b9f82fc8';
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [quantity, setQuantity] = useState('');

  const { addMeal } = useContext(MealContext);

  // Fonction pour effectuer une recherche dans la base de données d'aliments
  const handleSearch = () => {
    fetch(
      `https://api.edamam.com/api/food-database/v2/parser?app_id=${APP_ID}&app_key=${APP_KEY}&ingr=${searchQuery}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setSearchResults(null);
        } else {
          if (data.hints.length > 0) {
            console.log(data.hints[0].food);
            setSearchResults(data.hints[0].food);
            setError(null);
          }
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la requête :', error);
        setError("Une erreur s'est produite lors de la recherche.");
        setSearchResults(null);
      });
  };

  // Fonction pour ajouter un aliment au repas

  const handleAddToMeal = () => {
    if (searchResults) {
      setModalVisible(true);
    }
  };
  // Fonction pour fermer le modal

  const handleModalClose = () => {
    setModalVisible(false);
  };

  // Fonction pour soumettre les informations du modal afin de transmettre au planning via le Context
  const handleModalSubmit = () => {
    const meal = {
      name: searchResults.label,
      calories: searchResults.nutrients.ENERC_KCAL,
      day: selectedDay,
      mealType: selectedMeal,
      quantity,
    };
    addMeal(meal);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upperContainer}>
        <Text style={styles.title}>Find your Meal !</Text>
        <TextInput
          style={styles.input}
          placeholder="Search food..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.lowerContainer}>
        {searchResults && (
          <View>
            <Text style={styles.resultLabel}>Name: {searchResults.label}</Text>
            <Text style={styles.resultLabel}>
              Calories: {searchResults.nutrients.ENERC_KCAL.toFixed(2)}
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleAddToMeal}>
              <Text style={styles.buttonText}>Add to Meal</Text>
            </TouchableOpacity>
          </View>
        )}
        {error && <Text>{error}</Text>}
      </View>

      <View>
        <Modal visible={modalVisible} transparent>
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <Text style={styles.title}>Add to Meal</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Day:</Text>
                <ModalSelector
                  style={{ backgroundColor: 'white', borderRadius: 8 }}
                  data={[
                    { key: 0, label: 'Monday' },
                    { key: 1, label: 'Tuesday' },
                    { key: 2, label: 'Wednesday' },
                    { key: 3, label: 'Thursday' },
                    { key: 4, label: 'Friday' },
                    { key: 5, label: 'Saturday' },
                    { key: 6, label: 'Sunday' },
                  ]}
                  initValue={selectedDay} // Utilisez selectedDay comme initValue
                  onChange={(option) => setSelectedDay(option.label)}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Meal:</Text>
                <ModalSelector
                  style={{ backgroundColor: 'white', borderRadius: 8 }}
                  data={[
                    { key: 0, label: 'Breakfast' },
                    { key: 1, label: 'Lunch' },
                    { key: 2, label: 'Snack' },
                    { key: 3, label: 'Dinner' },
                  ]}
                  initValue={selectedMeal} // Utilisez selectedMeal comme initValue
                  onChange={(option) => setSelectedMeal(option.label)}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Quantity:</Text>
                <TextInput
                  style={styles.input}
                  value={quantity}
                  keyboardType="numeric"
                  onChangeText={setQuantity}
                />
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleModalSubmit}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleModalClose}>
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#364f6b',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upperContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  lowerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#47688D',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    top: 10,
    alignItems: 'center',
    backgroundColor: '#364f6b',
  },
  modal: {
    top: 50,
  },
  inputContainer: {
    marginBottom: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
  },
});

export default FoodDatabase;
