// src/navigation/AdminStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AdminScreen from '../screens/AdminScreen';
import ManageUsersScreen from '../screens/admin/ManageUsersScreen';
import ManageProductsScreen from '../screens/admin/ManageProductsScreen';
import ManagePaymentsScreen from '../screens/admin/ManagePaymentsScreen';
import PublishEventsScreen from '../screens/admin/PublishEventsScreen';

const Stack = createStackNavigator();

export default function AdminStack() {
  return (
    <Stack.Navigator initialRouteName="Admin">
      <Stack.Screen name="Admin" component={AdminScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ManageUsers" component={ManageUsersScreen} />
      <Stack.Screen name="ManageProducts" component={ManageProductsScreen} />
      <Stack.Screen name="ManagePayments" component={ManagePaymentsScreen} />
      <Stack.Screen name="PublishEvents" component={PublishEventsScreen} />
    </Stack.Navigator>
  );
}
