import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function CreateUserCard({ onCreate, navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('');
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    // Validar campos obligatorios
    if (!username || !password || !rol || !nombre || !telefono) {
      Alert.alert('Error', 'Por favor llena todos los campos obligatorios.');
      return;
    }

    const validRoles = ['cliente', 'administrador', 'agricultor'];
    const normalizedRole = rol.trim().toLowerCase();

    // Validar que el rol sea válido
    if (!validRoles.includes(normalizedRole)) {
      Alert.alert('Error', 'Rol inválido. Usa cliente, administrador o agricultor.');
      return;
    }

    // Construir el payload dinámicamente
    const newUser = {
      username,
      password,
      rol: normalizedRole,
      nombre,
      telefono,
      ...(normalizedRole === 'cliente' && { direccion }), // Incluir dirección solo si el rol es 'cliente'
    };

    console.log('Payload enviado al backend:', newUser);

    setLoading(true);
    try {
      await onCreate(newUser); // Llama al método para enviar los datos al backend
      Alert.alert('Éxito', 'Usuario creado correctamente.');
      navigation.goBack();
    } catch (error) {
      console.error('Error al crear usuario:', error);
      if (error.response && error.response.data) {
        Alert.alert('Error', error.response.data.message || 'No se pudo crear el usuario.');
      } else {
        Alert.alert('Error', 'No se pudo crear el usuario. Verifica los datos enviados.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Crear Nuevo Usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de Usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Text style={{ marginBottom: 10 }}>Rol:</Text>
      <TextInput style={styles.input} placeholder="Rol" value={rol} onChangeText={setRol} />

      <TextInput
        style={styles.input}
        placeholder="Nombre Completo"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        keyboardType="phone-pad"
        value={telefono}
        onChangeText={setTelefono}
      />
      {/* Mostrar campo de dirección solo si el rol es cliente */}
      {rol.trim().toLowerCase() === 'cliente' && (
        <TextInput
          style={styles.input}
          placeholder="Dirección"
          value={direccion}
          onChangeText={setDireccion}
        />
      )}
      <Button
        title={loading ? 'Creando...' : 'Crear Usuario'}
        onPress={handleCreate}
        disabled={loading}
        color="#4CAF50"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});
