import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Button } from "native-base";
import axios from 'axios';
const tienda = require('../assets/tiendaLogin.png');
export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Por favor ingresa todos los campos.');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('http://192.168.0.17:5000/api/auth/login', {
        username,
        password,
      });
      // Manejar la respuesta y redirigir a Home
      const data = response.data; // Supongo que el backend envía los datos del usuario aquí
      const user = data.user;
      console.log(user);
      
      console.log(user.username)
      if(user.rol === "cliente"){
        try{
          const response2 = await axios.get(`http://192.168.0.17:5000/api/producto/all`);
          const data2 = response2.data;
          console.log(data2);
          if (data2) {
            navigation.navigate('Home', { data2 });
          };
        }
        catch (error) {
          console.error(error);
          Alert.alert('Error', 'No hay productos disponibles.');
        } finally {
          setLoading(false);
        }
      }
      else if(user.rol === "administrador"){
        navigation.navigate('AdminStack', { user });
      }
      else if(user.rol === "agricultor"){ 
        const idA = user.id_agricultor;
        try {
          const response1 = await axios.get(`http://192.168.0.17:5000/api/producto?id_agricultor=${idA}`);
          const data1 = response1.data;
          console.log(data1);
          navigation.navigate('Agricultor', { user, productos: data1 });
          /* if (data1.length > 0) {
            navigation.navigate('Agricultor', { user, productos: data1 });
          } else {
            Alert.alert('Error', 'No hay productos disponibles.');
          } */
        }
        catch (error) {
          console.error(error);
          Alert.alert('Error', 'No hay agricultor disponibles.');
        } finally {
          setLoading(false);
        }
      }
      else{
        Alert.alert('Error', 'Acceso no autorizado.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Credenciales incorrectas o servidor no disponible.');
    } finally {
      setLoading(false);
    }

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
        <TextInput style={styles.input} placeholder="Usuario" value={username} onChangeText={setUsername}/>
        <Text style={styles.normal}>Contraseña</Text>
        <TextInput style={styles.input} placeholder="******" secureTextEntry value={password} onChangeText={setPassword}/>
        {/* <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity> */}
        <Button size="sm" variant="outline" onPress={handleLogin} isLoading={loading} isLoadingText="Cargando">
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
  header: {
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