import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Dish = {
  name: string;
  courseType: string;
  description: string;
  price: string;
};

const FullMenuPage = () => {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [filteredDishes, setFilteredDishes] = useState<Dish[]>([]);
  const [filter, setFilter] = useState('All'); // State for filtering

  useEffect(() => {
    const loadDishes = async () => {
      try {
        const storedDishes = await AsyncStorage.getItem('dishes');
        if (storedDishes) {
          const parsedDishes = JSON.parse(storedDishes);
          setDishes(parsedDishes);
          setFilteredDishes(parsedDishes); // Initially display all dishes
        }
      } catch (error) {
        console.error('Error loading dishes', error);
      }
    };
    loadDishes();
  }, []);

  useEffect(() => {
    filterDishes();
  }, [filter, dishes]);

  const filterDishes = () => {
    if (filter === 'All') {
      setFilteredDishes(dishes);
    } else {
      setFilteredDishes(dishes.filter(dish => dish.courseType === filter));
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <Text style={styles.title}>Full Menu</Text>

      {/* Filter buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => setFilter('All')} style={styles.filterButton}>
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('Starter')} style={styles.filterButton}>
          <Text style={styles.filterText}>Starters</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('Main Course')} style={styles.filterButton}>
          <Text style={styles.filterText}>Main Course</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('Dessert')} style={styles.filterButton}>
          <Text style={styles.filterText}>Desserts</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {filteredDishes.map((dish, index) => (
          <View key={index} style={styles.dishCard}>
            <Text style={styles.dishName}>{dish.name}</Text>
            <Text>{dish.courseType}</Text>
            <Text>{dish.description}</Text>
            <Text>R{dish.price}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default FullMenuPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
    margin: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  filterButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  filterText: {
    fontWeight: 'bold',
    fontSize: 16,
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
});
