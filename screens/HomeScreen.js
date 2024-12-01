import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';


export default function HomeScreen({ navigation, route }) {
  const userData = route.params?.user;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido {userData.username} a Cultivo en Red</Text>
      <Button
        title="Ver Productos"
        onPress={() => navigation.navigate('Products')}
      />
      <Button
        title="Mi Perfil"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});
