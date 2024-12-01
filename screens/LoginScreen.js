import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Button } from "native-base";

const tienda = require('../assets/tiendaLogin.png');

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {

    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.bienvenido}>Bienvenido a</Text>
        <Text style={[styles.title, styles.greenText]}>CULTIVO EN RED</Text>
        <Image source={tienda} style={{ width: 240, height: 180, marginHorizontal: 40}} />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <Text style={styles.normal}>Nombre</Text>
        <TextInput style={styles.input} placeholder=" " />
        <Text style={styles.normal}>Contraseña</Text>
        <TextInput style={styles.input} placeholder=" " secureTextEntry />
        {/* <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity> */}
        <Button style={styles.button} size="sm" variant="outline" onPress={handleLogin}>
            <Text style={styles.footerText}>Ingresar</Text>
        </Button>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.footerText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('Register') }>
          <Text style={styles.footerText}>¿Todavia no tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
      </View>
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
  bienvenido: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    margin: 10,
    marginBlockEnd: -10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    margin: 10,
  },
  normal: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff',
  },
  greenText: {
    color: '#4CAF50',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#5ba73b',
    borderTopStartRadius: 35,
    borderTopEndRadius: 35,
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#c3dbb8',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#5ba73b',
    width: '30%',
    height: 50,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    position: 'relative',
    flex: 1,
    bottom: 0,
    width: '100%',
    backgroundColor: '#5ba73b',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  footerText: {
    marginHorizontal: 10,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    margin: 2,
  },
});