import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Button,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

// Fonction calcul du BMR
const calculateBMR = (age, gender, height, weight, activityLevel, healthGoal) => {
  let bmr = 0;

  // Calcul du BMR de base
  if (gender === 'male') {
    bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
  } else if (gender === 'female') {
    bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
  }

  // Calcul du nombre de calorie en fonction de l'activité
  switch (activityLevel) {
    case 'Sedentary':
      bmr *= 1.2;
      break;
    case 'Light Exercise':
      bmr *= 1.375;
      break;
    case 'Moderate Exercise':
      bmr *= 1.55;
      break;
    case 'Heavy Exercise':
      bmr *= 1.725;
      break;
    case 'Extra Exercise':
      bmr *= 1.9;
      break;
  }

  // Calcul final du nombre de calories en fonction du health goal
  if (healthGoal === 'Weight Loss') {
    bmr -= 500;
  } else if (healthGoal === 'Weight Gain') {
    bmr += 500;
  }
  return bmr;
};

const HealthScreen = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [healthGoal, setHealthGoal] = useState('');
  const [bmrResult, setBMRResult] = useState(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);




  const handleSubmit = () => {
    const bmr = calculateBMR(age, gender, height, weight, activityLevel, healthGoal);
    setBMRResult(bmr);
    setIsFormSubmitted(true);
  };
  
  

  const handleReset = () => {
    setAge('');
    setGender('');
    setHeight('');
    setWeight('');
    setActivityLevel('');
    setHealthGoal('');
    setBMRResult(null);
    setIsFormSubmitted(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {!isFormSubmitted ? (
        <SafeAreaView style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Age</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your age"
              keyboardType="numeric"
              value={age}
              onChangeText={(text) => setAge(text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}> Gender </Text>
            <TouchableOpacity style={styles.pickerContainer} onPress={() => setModalVisible(true)}>
              <Text style={styles.pickerText}>{gender ? gender : 'Select gender'}</Text>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(false);
              }}>
              <View style={styles.modalContainer}>
                <Picker
                  style={styles.picker}
                  selectedValue={gender}
                  onValueChange={(itemValue, itemIndex) => setGender(itemValue)}>
                  <Picker.Item label="Male" value="male" />
                  <Picker.Item label="Female" value="female" />
                </Picker>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    setModalVisible(false);
                  }}>
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}> Height </Text>
            <TextInput
              placeholder="Enter your height"
              keyboardType="numeric"
              style={styles.input}
              value={height}
              onChangeText={(text) => setHeight(text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}> Weight </Text>
            <TextInput
              placeholder="Enter your weight"
              keyboardType="numeric"
              style={styles.input}
              value={weight}
              onChangeText={(text) => setWeight(text)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}> Activity Level </Text>
            <TouchableOpacity
              style={styles.pickerContainer}
              onPress={() => setModalVisible('activityLevel')}>
              <Text style={styles.pickerText}>
                {activityLevel ? activityLevel : 'Select activity level'}
              </Text>
            </TouchableOpacity>
            <Modal
              style={styles.modalContainer}
              animationType="slide"
              transparent
              visible={modalVisible === 'activityLevel'}
              onRequestClose={() => {
                setModalVisible(null);
              }}>
              <View style={styles.modalContainer}>
                <Picker
                  style={styles.picker}
                  selectedValue={activityLevel}
                  onValueChange={(itemValue, itemIndex) => setActivityLevel(itemValue)}>
                  <Picker.Item label="Sedentary" value="Sedentary" />
                  <Picker.Item label="Light Exercise" value="Light Exercise" />
                  <Picker.Item label="Moderate Exercise" value="Moderate Exercise" />
                  <Picker.Item label="Heavy Exercise" value="Heavy Exercise" />
                  <Picker.Item label="Extra Exercise" value="Extra Exercise" />
                </Picker>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    setModalVisible(false);
                  }}>
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}> Health goal </Text>
            <TouchableOpacity
              style={styles.pickerContainer}
              onPress={() => setModalVisible('healthGoal')}>
              <Text style={styles.pickerText}>
                {healthGoal ? healthGoal : 'Select health goal'}
              </Text>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent
              visible={modalVisible === 'healthGoal'}
              onRequestClose={() => {
                setModalVisible(null);
              }}>
              <View style={styles.modalContainer}>
                <Picker
                  style={styles.picker}
                  selectedValue={healthGoal}
                  onValueChange={(itemValue, itemIndex) => setHealthGoal(itemValue)}>
                  <Picker.Item label="Weight Loss" value="Weight Loss" />
                  <Picker.Item label="Weight Maintenance" value="Weight Maintenance" />
                  <Picker.Item label="Weight Gain" value="Weight Gain" />
                </Picker>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    setModalVisible(false);
                  }}>
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>

          <View>
            <TouchableOpacity
              style={[
                styles.button,
                (!age || !gender || !height || !weight || !activityLevel || !healthGoal) &&
                  styles.disabledButton,
              ]}
              onPress={handleSubmit}
              disabled={!age || !gender || !height || !weight || !activityLevel || !healthGoal}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      ) : (
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>BMR Result:</Text>
          <Text style={styles.resultText}>{bmrResult.toFixed(2)}</Text>

          <View style={{ marginTop: 20 }}>
            <TouchableOpacity style={styles.button} onPress={handleReset}>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 60,
    backgroundColor: '#364f6b',
  },
  inputContainer: {
    top: '5%',
    bottom: '5%',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
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
  pickerContainer: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    justifyContent: 'center',
    paddingHorizontal: 8,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  pickerText: {
    fontSize: 16,
    color: 'gray',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#364f6b',
  },
  picker: {
    width: '100%',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  resultText: {
    fontSize: 16,
    color: 'white',
  },
  button: {
    backgroundColor: '#47688D',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#9BAEBF',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HealthScreen;
