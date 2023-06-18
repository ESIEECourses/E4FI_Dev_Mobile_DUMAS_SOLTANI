import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';

const WelcomePage = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Health Goals');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/MealMasterLogo.png')} style={styles.logo} />
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Start your journey ! </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#364f6b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
  button: {
    backgroundColor: '#47688D',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default WelcomePage;
