import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// Components
import AllPlace from './screen/AllPlace';
import AddPlace from './screen/AddPlace';
import Map from './screen/Map';
//React
import { useEffect, useState } from 'react';
//Database
import { migrateDbIfNeeded } from './util/database';
import { SQLiteProvider } from 'expo-sqlite';
//Context
import PlaceContextProvider from './store';



const Stack = createStackNavigator();



export default function App() {
  return (
 
      <SQLiteProvider databaseName='test' onInit={migrateDbIfNeeded}>
           <PlaceContextProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='AllPlace' component={AllPlace}/>
            <Stack.Screen name='AddPlace' component={AddPlace}/>
            <Stack.Screen name='Map' component={Map} />
          </Stack.Navigator>
        </NavigationContainer>
        </PlaceContextProvider>
      </SQLiteProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
