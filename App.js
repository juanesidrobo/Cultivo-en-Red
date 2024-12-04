//App.js
import React from 'react';
import { NativeBaseProvider } from 'native-base'; // Importa NativeBaseProvider
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import AgricultorScreen from './screens/AgricultorScreen';
import AdminStack from './navigation/AdminStack';
import AddProductScreen from './screens/AddProductScreen';
import EditProductScreen from './screens/EditProductScreen';
import CartScreen from './screens/CartScreen';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="CartScreen" component={CartScreen} />
          <Stack.Screen name="Agricultor" component={AgricultorScreen} />
          <Stack.Screen name="AdminStack" component={AdminStack} options={{ headerShown: false }} />
          <Stack.Screen name="AddProduct" component={AddProductScreen} />
          <Stack.Screen name="EditProduct" component={EditProductScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
