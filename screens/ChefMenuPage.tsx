import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';

const ChefMenuPage = ({ navigation }) => {
  const [courseType, setCourseType] = useState('');
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const loadDishes = async () => {
      try {
        const storedDishes = await AsyncStorage.getItem('dishes');
        if (storedDishes) setDishes(JSON.parse(storedDishes));
      } catch (error) {
        console.error('Error loading dishes', error);
      }
    };
    loadDishes();
  }, []);

  const SubmitFunc = async () => {
    if (!dishName || !courseType || !description || !price) {
      alert('Please fill in all the fields');
      return;
    }

    const newDish = { name: dishName, courseType, description, price };
    const updateDishes = [...dishes, newDish];

    try {
      await AsyncStorage.setItem('dishes', JSON.stringify(updateDishes));
      setDishes(updateDishes);
      alert('Successfully added dish');
    } catch (error) {
      console.error('Error saving dish', error);
    }

    setCourseType('');
    setDescription('');
    setDishName('');
    setPrice('');
  };

  const removeDish = async (index) => {
    const updatedDishes = dishes.filter((_, i) => i !== index); // Remove dish at index
    setDishes(updatedDishes);

    try {
      await AsyncStorage.setItem('dishes', JSON.stringify(updatedDishes)); // Update AsyncStorage
    } catch (error) {
      console.error('Error updating storage', error);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <ScrollView>
        <View style={styles.navbar}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={styles.backbutton}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('FullMenu')}>
            <Text style={styles.backbutton}>View Menu</Text>
          </TouchableOpacity>
        </View>

        {/* Input form for adding dishes */}
        <Picker
          selectedValue={courseType}
          onValueChange={setCourseType}
          style={styles.picker}>
          <Picker.Item label="Starter" value="Starter" />
          <Picker.Item label="Main Course" value="Main Course" />
          <Picker.Item label="Dessert" value="Dessert" />
        </Picker>

        <TextInput placeholder="Dish Name" style={styles.input} value={dishName} onChangeText={setDishName} />
        <TextInput placeholder="Description" style={styles.input} value={description} onChangeText={setDescription} />
        <TextInput placeholder="Price" style={styles.input} value={price} onChangeText={setPrice} />

        <TouchableOpacity onPress={SubmitFunc} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add to Menu</Text>
        </TouchableOpacity>

        {/* Display the added dishes */}
        <Text style={styles.title}>Added Dishes</Text>
        {dishes.length > 0 ? (
          dishes.map((dish, index) => (
            <View key={index} style={styles.dishCard}>
              <Text style={styles.dishName}>{dish.name}</Text>
              <Text>{dish.courseType}</Text>
              <Text>{dish.description}</Text>
              <Text>R{dish.price}</Text>

              <TouchableOpacity onPress={() => removeDish(index)} style={styles.removeButton}>
                <Text style={styles.removeButtonText}>REMOVE</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.noDishesText}>No dishes added yet.</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default ChefMenuPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  backbutton: {
    color: 'white',
    fontSize: 18,
  },
  picker: {
    height: 150,
    width: '100%',
  },
  input: {
    borderColor: 'black',
    borderWidth: 2,
    margin: 10,
    padding: 10,
  },
  addButton: {
    backgroundColor: 'white',
    padding: 15,
    margin: 20,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
    color: 'white',
    textAlign: 'center',
  },
  dishCard: {
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  dishName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noDishesText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    marginTop: 20,
  },
});
