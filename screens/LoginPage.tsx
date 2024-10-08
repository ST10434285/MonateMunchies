import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'

const LoginPage = ({navigation}) => {
    const [inputPassword, setInputPassword] = useState('');

    const validateLogin = () => {
        const correctPassword = 'MONATE';
        if (inputPassword === correctPassword) {
            navigation.navigate('ChefMenu');
        }
        else {
            Alert.alert('You have entered incorrect password, try again');
        }
    }

      return (
    <View style={styles.container}>
        <Image source={require('../assets/MonateMunchie 1.png')} style={styles.Image}/>
        <TextInput placeholder='Username' style={styles.username} /> 
        <TextInput value={inputPassword} placeholder='Password' style={styles.password} onChangeText={setInputPassword}/>
        <TouchableOpacity style={styles.button} onPress={validateLogin}>
            <Text>
                LOGIN
            </Text>
        </TouchableOpacity> 
    </View> 
  )
}

export default LoginPage

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center',
      },

    Image: {
        width: 310,
        height: 450,
    },

    username: {
        width: 300,
        margin: 20,
        padding: 20,
        backgroundColor: 'white',
    },

    password: {
        padding: 20,
        width: 300,
        backgroundColor: 'white',
        alignItems: 'center',
    },

    button: {
        padding: 20,
        borderRadius: 10,
        marginTop: 20,
        backgroundColor: 'white',
    },
})