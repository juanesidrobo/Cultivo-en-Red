
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button, VStack, Center } from "native-base";
import axios from 'axios';

const tienda = require('../assets/tiendaLogin.png'); 

export default function AdminScreen({ navigation, route }) {
  const user = route.params?.user;
  const handleUsers = async () => {
    try {
      const response = await axios.get('https://cultivo-en-red-1074366058014.us-east1.run.app/api/users/');
      const data = response.data;
      console.log(data);
      if (data) {
        navigation.navigate('ManageUsers', { users: data });
      }

    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudieron cargar los usuarios.');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.bienvenido}>Bienvenido Administrador {user.rol} a</Text>
        <Text style={[styles.title, styles.greenText]}>CULTIVO en RED</Text>
        <Image source={tienda} style={styles.image} />
      </View>
      <VStack space={4} alignItems="center" style={styles.options}>
        <Button
          size="lg"
          colorScheme="green"
          style={styles.button}
          onPress={(handleUsers)}
        >
          Gestionar Usuarios
        </Button>
        <Button
          size="lg"
          colorScheme="green"
          style={styles.button}
          onPress={() => navigation.navigate('ManageProducts')}
        >
          Gestionar Productos
        </Button>
        <Button
          size="lg"
          colorScheme="green"
          style={styles.button}
          onPress={() => navigation.navigate('ManagePayments')}
        >
          Gestionar Pagos
        </Button>
        <Button
          size="lg"
          colorScheme="green"
          style={styles.button}
          onPress={() => navigation.navigate('PublishEvents')}
        >
          Publicar Eventos
        </Button>
      </VStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  bienvenido: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginVertical: 10,
  },
  greenText: {
    color: '#4CAF50',
  },
  image: {
    width: 239,
    height: 180,
    marginVertical: 20,
  },
  options: {
    width: '90%',
  },
  button: {
    width: '100%',
  },
});
