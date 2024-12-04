import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const anuncio = require('../assets/anucio-cliente.png');
const verduras = require('../assets/verduras.png');
const plantas = require('../assets/plantas.png');
const frutas = require('../assets/frutas-cliente.png');

export default function HomeScreen({ route, navigation }) {
  const data2 = route.params?.data2; // Datos obtenidos del backend

  const handleSearch = () => {
    console.log('Buscar...');
  };

  const renderHeader = () => (
    <View>
      {/* Header */}
      <View style={[styles.header, { paddingHorizontal: 40 }]}>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={24} color="#4CAF50" />
        </TouchableOpacity>
        <Text style={styles.title}>CULTIVO en RED</Text>
        <TouchableOpacity style={styles.cartButton}>
          <Ionicons name="cart-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>



      {/* Barra de búsqueda */}
      <View style={[styles.searchContainer, { marginHorizontal: 40 }]}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar..."
          placeholderTextColor="#4CAF50"
        />
        <TouchableOpacity style={styles.searchIcon}>
          <Ionicons name="search" size={24} color="#4CAF50" onPress={handleSearch} />
        </TouchableOpacity>
      </View>

      {/* Próximas Cosechas */}
      <View style={styles.section}>
        <Image
          source={anuncio} // Uso de la constante anuncio para cargar la imagen
          style={{ width: 300, height: 139, marginHorizontal: 40 }}
        />
      </View>

      {/* Categorías */}
      <View style={styles.categories}>
        <Text style={styles.sectionTitle}>Categorías</Text>
        <View style={styles.categoryList}>
          <TouchableOpacity style={styles.categoryButton}>
            <Image source={frutas} style={styles.categoryImage} />
            <Text style={styles.categoryText}>Frutas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Image source={verduras} style={styles.categoryImage} />
            <Text style={styles.categoryText}>Verduras</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Image source={plantas} style={styles.categoryImage} />
            <Text style={styles.categoryText}>Plantas</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Título de productos */}
      <View style={styles.productsSection}>
        <Text style={styles.sectionTitle}>Productos Disponibles</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={data2}
      keyExtractor={(item) => item.codigo.toString()} // Usa "codigo" como clave única
      ListHeaderComponent={renderHeader}
      renderItem={({ item }) => (
        <View style={styles.productCard}>
          <View style={styles.productHeader}>
            <Text style={styles.productTitle}>{item.producto_nombre}</Text>
            <TouchableOpacity onPress={() => console.log(`Seleccionado: ${item.producto_nombre}`)}>
              <Ionicons name="cart" size={20} color="#4CAF50" style={styles.cartIcon} />
            </TouchableOpacity>
          </View>
          <Text style={styles.productSubtitle}>
            {item.agricultor_nombre || 'Desconocido'}
          </Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={16} color="#4CAF50" style={styles.locationIcon} />
            <Text style={styles.productLocation}>
              {item.direccion || 'No especificada'}
            </Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>${item.precio || '0'}</Text>
          </View>
        </View>
      )}
      contentContainerStyle={styles.productsContainer}
      ListEmptyComponent={
        <Text style={styles.noProducts}>No hay productos disponibles.</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6ff',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2, // Agrega una ligera sombra
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    flex: 1,
  },
  menuButton: {
    padding: 10,
  },
  cartButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 40,
    marginTop: 10,
    marginHorizontal: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#4CAF50',
  },
  searchIcon: {
    marginLeft: 10,
  },
  section: {
    padding: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  categories: {
    paddingHorizontal: 20,
  },
  categoryList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    width: 90,
    height: 110,
    elevation: 3,
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
  productsSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  productsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    width: '95%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  productSubtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 5,
  },
  productLocation: {
    fontSize: 12,
    color: '#888',
  },
  cartIcon: {
    padding: 5,
    borderRadius: 20,
    backgroundColor: '#f4f6ff',
  },
  priceContainer: {
    marginTop: 5,
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 16, // Aumenta el tamaño de la fuente
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  noProducts: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
});
