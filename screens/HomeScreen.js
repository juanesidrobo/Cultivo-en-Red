import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const anuncio = require('../assets/anucio-cliente.png');
const verduras = require('../assets/verduras.png');
const plantas = require('../assets/plantas.png');
const frutas = require('../assets/frutas-cliente.png');

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu" size={24} color="#4CAF50" />
        </TouchableOpacity>
        <Text style={styles.title}>CULTIVO en RED</Text>
        <TouchableOpacity style={styles.cartButton}>
          <Ionicons name="cart-outline" size={24} color="#fff" style={styles.cartIcon} />
        </TouchableOpacity>
      </View>

      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.searchInput} 
          placeholder="Buscar..." 
          placeholderTextColor="#4CAF50" 
        />
        <TouchableOpacity style={styles.searchIcon}>
          <Ionicons name="search" size={24} color="#4CAF50" />
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
            <Image 
              source={frutas} // Imagen local de frutas
              style={styles.categoryImage} 
            />
            <Text style={styles.categoryText}>Frutas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Image 
              source={verduras} // Imagen local de verduras
              style={styles.categoryImage} 
            />
            <Text style={styles.categoryText}>Verduras</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Image 
              source={plantas} // Imagen local de plantas
              style={styles.categoryImage} 
            />
            <Text style={styles.categoryText}>Plantas</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Productos */}
      <View style={styles.products}>
        <View style={styles.productCard}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/100' }} 
            style={styles.productImage} 
          />
          <View style={styles.productInfo}>
            <Text style={styles.productTitle}>Banano Maduro</Text>
            <Text style={styles.productSubtitle}>Wilson Manduley</Text>
            <Text style={styles.productLocation}>Vendido en El Tunal, Popayán</Text>
          </View>
        </View>
        <View style={styles.productCard}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/100' }} 
            style={styles.productImage} 
          />
          <View style={styles.productInfo}>
            <Text style={styles.productTitle}>Tomate Chonto</Text>
            <Text style={styles.productSubtitle}>Catalina Ceballos</Text>
            <Text style={styles.productLocation}>Tiendas, Cauca</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6ff', // Fondo modificado
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    flex: 1, // Esto permite que el título tome todo el espacio disponible entre los botones
  },
  menuButton: {
    padding: 10,
  },
  cartButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
  },
  cartIcon: {
    color: '#fff',
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
    backgroundColor: '#fff', // Fondo blanco para los botones
    borderRadius: 10,
    padding: 10,
    width: 90, // Ancho del botón
    height: 110, // Altura del botón
    elevation: 3, // Sombra para dar efecto de recuadro
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 25, // Hace las imágenes circulares
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
  products: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  productInfo: {
    marginLeft: 10,
    flex: 1,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productSubtitle: {
    fontSize: 14,
    color: '#555',
  },
  productLocation: {
    fontSize: 12,
    color: '#888',
  },
});
