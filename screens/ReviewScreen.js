import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import axios from 'axios';

export default function ReviewScreen({ route }) {
  const { codigo_producto } = route.params; 
  const [resenas, setResenas] = useState([]);
  const [promedio, setPromedio] = useState(0);
  const [nombreProducto, setNombreProducto] = useState('');


  useEffect(() => {
    const fetchDatos = async () => {
      try {
        // Obtener las reseñas
        const resenasResponse = await axios.get(
          `https://cultivo-en-red-1074366058014.us-east1.run.app/api/resenas/${codigo_producto}`
        );
        setResenas(resenasResponse.data.resenas);
        setPromedio(resenasResponse.data.promedio);

        
        const productoResponse = await axios.get(
          `https://cultivo-en-red-1074366058014.us-east1.run.app/api/producto/searchbyCodigo?codigo=${codigo_producto}`
        );
        setNombreProducto(productoResponse.data.nombre || 'Producto no encontrado');
      } catch (error) {
        console.error('Error al obtener datos:', error);
        setNombreProducto('Error al cargar el nombre');
      }
    };

    fetchDatos();
  }, [codigo_producto]);

  // Renderizar cada reseña
  const renderResena = ({ item }) => (
    <View style={styles.reviewCard}>
      <Image
        style={styles.avatar}
        source={require('../assets/avatar.png')} 
      />
      <View style={styles.reviewContent}>
        <Text style={styles.clientName}>{item.cliente}</Text>
        <Text style={styles.comment}>{item.comentario}</Text>
        <Text style={styles.stars}>{'★'.repeat(item.numero_estrellas)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>RESEÑAS</Text>
      <Text style={styles.productName}>
        {nombreProducto || 'Cargando...'} 
      </Text>
      <Text style={styles.averageStars}>{'★'.repeat(Math.round(promedio))}</Text>
      <FlatList
        data={resenas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderResena}
        contentContainerStyle={styles.reviewList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5ba73b',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 4,
  },
  averageStars: {
    fontSize: 24,
    color: '#FFD700', 
    textAlign: 'center',
    marginBottom: 16,
  },
  reviewList: {
    paddingBottom: 16,
  },
  reviewCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  reviewContent: {
    flex: 1,
  },
  clientName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  comment: {
    fontSize: 14,
    color: '#555',
    marginVertical: 4,
  },
  stars: {
    color: '#FFD700', 
    fontSize: 16,
  },
});
