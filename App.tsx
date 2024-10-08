import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomePage from './screens/HomePage';
import LoginPage from './screens/LoginPage';
import ChefMenuPage from './screens/ChefMenuPage';
import FullMenu from './screens/FullMenu';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='HomePage'>
        <Stack.Screen name='Home' component={HomePage} options={{headerShown: true}}/>
        <Stack.Screen name='Login' component={LoginPage} options={{headerShown: true}}/>
        <Stack.Screen name='ChefMenu' component={ChefMenuPage} options={{headerShown: true}}/>
        <Stack.Screen  name= 'FullMenu' component={FullMenu} options={{headerShown: true}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
