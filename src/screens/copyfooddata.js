import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  SafeAreaView,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import ModalSelector from 'react-native-modal-selector';

const FoodDatabase = ({ navigation }) => {
  const APP_ID = 'b93b7010';
  const APP_KEY = 'cb57f85c98d052d57b80d397f8b522ad';
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [error, setError] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [quantity, setQuantity] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [mealToAdd, setMealToAdd] = useState(null);

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

  const handleAddToMeal = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleModalSubmit = () => {
    const meal = {
      mealType: selectedMeal,
      day: selectedDay,
      quantity,
      food: searchResults,
    };
    setMealToAdd(meal);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Welcome to the Food Database Screen!</Text>
        <TextInput
          style={styles.input}
          placeholder="Search food..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Button title="Search" onPress={handleSearch} />
        {searchResults && (
          <View>
            <Text>Name: {searchResults.label}</Text>
            <Text>Calories: {searchResults.nutrients.ENERC_KCAL}</Text>
            <Button title="Add to Meal" onPress={handleAddToMeal} />
          </View>
        )}
        {error && <Text>{error}</Text>}
      </View>
      <Modal visible={modalVisible} transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Add to Meal</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Day:</Text>
              <ModalSelector
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
              <TextInput style={styles.input} value={quantity} onChangeText={setQuantity} />
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Submit" onPress={handleModalSubmit} />
              <Button title="Close" onPress={handleModalClose} />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 8,
  },  
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default FoodDatabase;
