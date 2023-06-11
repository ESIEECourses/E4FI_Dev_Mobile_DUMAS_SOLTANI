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



const FoodDatabase = ({ navigation }) => {
  const APP_ID = 'b93b7010';
  const APP_KEY = 'cb57f85c98d052d57b80d397f8b522ad';
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [error, setError] = useState(null);


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
          </View>
        )}
        {error && <Text>{error}</Text>}
      </View>
     
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
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    justifyContent: 'center',
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
    backgroundColor: 'white',
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


