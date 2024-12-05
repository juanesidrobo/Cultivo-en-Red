import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, FlatList, Alert, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import MisPedidosScreen from './MisPedidos';

const anuncio = require('../assets/anucio-cliente.png');
const verduras = require('../assets/verduras.png');
const plantas = require('../assets/plantas.png');
const frutas = require('../assets/frutas-cliente.png');

export default function HomeScreen({ route, navigation }) {
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [reseña, setReseña] = useState(null);

  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState(route.params?.data2 || []);

  // Función para mostrar detalles del producto y obtener reseñas
  const handleShowProductDetails = async (item) => {
    setSelectedProduct(item);
    setQuantity(1);
    setModalVisible(true);
    try {
      const response = await axios.get(`https://cultivo-en-red-1074366058014.us-east1.run.app/api/resenas/${item.codigo}`);
      const reseñas = response.data.resenas;
      if (reseñas.length > 0) {
        setReseña(reseñas[Math.floor(Math.random() * reseñas.length)]);
      } else {
        setReseña(null);
      }
    } catch (error) {
      console.error('Error al obtener la reseña:', error);
      setReseña(null);
    }
  };

  // Función para manejar la búsqueda
  const handleSearch = async () => {
    if (searchText.trim() === '') {
      setData(route.params?.data2 || []);
      return;
    }
    try {
      const response = await axios.get(`https://cultivo-en-red-1074366058014.us-east1.run.app/api/producto/search?nombre=${encodeURIComponent(searchText)}`);
      const searchResults = response.data;
      setData(searchResults);
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error);
      Alert.alert('Error', 'No se pudo realizar la búsqueda.');
    }
  };

  // Efecto para restaurar los datos originales cuando el texto de búsqueda está vacío
  useEffect(() => {
    if (searchText.trim() === '') {
      setData(route.params?.data2 || []);
    }
  }, [searchText]);

  // Resto de funciones (handleAddToCart, handleGoToCart, etc.)
  // Confirmar y agregar el producto al carrito
  const handleAddToCart = () => {
    if (!selectedProduct) return;

    setCart((prevCart) => {
      
      const exists = prevCart.some((cartItem) => cartItem.codigo === selectedProduct.codigo);

      if (exists) {
        Alert.alert('Producto duplicado', `${selectedProduct.producto_nombre} ya está en el carrito.`);
        return prevCart; 
      }      

     
      const productWithQuantity = { ...selectedProduct, cantidad: quantity };
      Alert.alert('Producto añadido', `${selectedProduct.producto_nombre} se añadió al carrito con cantidad: ${quantity}.`);
      return [...prevCart, productWithQuantity];
    });
    setModalVisible(false); 
  };


  const handleGoToCart = () => {
    navigation.navigate('CartScreen', { cart }); 
  };


  const increaseQuantity = () => {
    if (quantity < selectedProduct.cantidadDisponible) {
      setQuantity(quantity + 1);
    }
  };


  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // ...

  const renderHeader = () => (
    <View>
      {/* Header */}
      <View style={[styles.header, { paddingHorizontal: 40 }]}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('MisPedidos')}>
          <Ionicons name="menu" size={24} color="#4CAF50" />
        </TouchableOpacity>
        <Text style={styles.title}>CULTIVO en RED</Text>
        <TouchableOpacity style={styles.cartButton} onPress={handleGoToCart}>
          <Ionicons name="cart-outline" size={24} color="#fff" />
          {cart.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cart.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      {/* Barra de búsqueda */}
      <View style={[styles.searchContainer, { marginHorizontal: 40 }]}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar..."
          placeholderTextColor="#4CAF50"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableOpacity style={styles.searchIcon} onPress={handleSearch}>
          <Ionicons name="search" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {/* Próximas Cosechas */}
      <View style={styles.section}>
        <Image
          source={anuncio}
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
    <>
      <FlatList
        data={data}
        keyExtractor={(item) => item.codigo.toString()}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <View style={styles.productHeader}>
              <Text style={styles.productTitle}>{item.producto_nombre}</Text>
              <TouchableOpacity onPress={() => handleShowProductDetails(item)}>
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

      {/* Modal para agregar al carrito */}
      {selectedProduct && (
        <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedProduct.producto_nombre}</Text>
              <Text style={styles.modalText}>Descripción: {selectedProduct.descripcion}</Text>
              <Text style={styles.modalText}>Agricultor: {selectedProduct.agricultor_nombre}</Text>
              <Text style={styles.modalText}>Ubicación: {selectedProduct.direccion}</Text>

              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={decreaseQuantity}>
                  <Ionicons name="remove-circle-outline" size={24} color="#4CAF50" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity onPress={increaseQuantity}>
                  <Ionicons name="add-circle-outline" size={24} color="#4CAF50" />
                </TouchableOpacity>
              </View>

              <Text style={styles.priceText}>Precio Kilo: ${selectedProduct.precio}</Text>

               {/* Mostrar la reseña */}
               {reseña ? (
                <View style={styles.reviewCard}>
                  <Text style={styles.reviewTitle}>Reseñas:</Text>
                  <Text style={styles.clientName}>{reseña.cliente}</Text>
                  <Text style={styles.comment}>{reseña.comentario}</Text>
                  <Text style={styles.stars}>{'★'.repeat(reseña.numero_estrellas)}</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('ReviewScreen', { codigo_producto: selectedProduct.codigo })}>
                    <Ionicons name="arrow-forward-circle" size={30} color="#4CAF50" />
                  </TouchableOpacity>
                </View>
              ) : (
                <Text>No hay reseñas para este producto.</Text>
              )}


              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={handleAddToCart}
              >
                <Text style={styles.addToCartText}>Agregar al carrito</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </Modal>
      )}
    </>
  );
}

// Estilos
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
    elevation: 2, 
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
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
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
    paddingHorizontal: 20,
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
    fontSize: 16, 
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  noProducts: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20,
    padding: 20,
    width: '100%', 
    height: '50%', 
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  addToCartButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addToCartText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewsContainer: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#f4f4f4',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  reviewCard: {
    backgroundColor: '#5ba73b',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  clientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  comment: {
    fontSize: 14,
    color: '#fff',
    marginVertical: 5,
  },
  stars: {
    fontSize: 16,
    color: '#FFD700',
  },
  addToCartButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addToCartText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
