/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  useColorScheme,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import Details from './components/Details';
import Search from './components/Search';



const Stack = createNativeStackNavigator()
function App(){

  return (
    <NavigationContainer>
      <Stack.Navigator  initialRouteName='login' screenOptions={
        {
          headerShown:false
        }
      }>
        <Stack.Screen name='home' component={Home}></Stack.Screen>
        <Stack.Screen name='login' component={Login}></Stack.Screen>
        <Stack.Screen name='signup' component={Signup}></Stack.Screen>
        <Stack.Screen name='detail' component={Details}></Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default App;
