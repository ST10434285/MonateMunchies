import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const HomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/MonateMunchie 1.png')} style={styles.Image} />
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text>
          LOGIN
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FullMenu')}>
        <Text>
          View Menu
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomePage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },

  Image: {
    width: 340,
    height: 450,
    alignSelf: 'center',
  },

  button: {
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: 'white',
  }
})
