import { StatusBar } from 'expo-status-bar';
import * as React from "react";
import { StyleSheet, Text, View,SafeAreaView } from 'react-native';
import HomeScreen from "./components/HomeScreen";
import Checkin from "./components/Checkin";
import Item from "./components/Item";
import Attendance from "./components/Attendance";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Stack.Screen name="Checkin" component={Checkin}
          options={({navigation,})=>({ 
            title: '',
          })}/>
        <Stack.Screen name="Attendance" component={Attendance}
          options={({navigation})=>({ 
            title: 'Attendance',
          
          })}/>
      </Stack.Navigator>
    </NavigationContainer>

    
  );
  
}


