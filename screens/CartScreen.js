import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default function CartScreen({ route, navigation }) {
  const { cart } = route.params; // Productos enviados desde HomeScreen
  const [selectedItems, setSelectedItems] = useState([]); // Productos seleccionados
  const [cartItems, setCartItems] = useState(cart); // Estado para los productos del carrito
  const [loading, setLoading] = useState(false); // Estado para manejar el indicador de carga

  // Manejar la selección de un producto
  const handleSelectItem = (item) => {
    if (selectedItems.includes(item.codigo)) {
      setSelectedItems(selectedItems.filter((id) => id !== item.codigo)); // Deseleccionar si ya está seleccionado
    } else {
      setSelectedItems([...selectedItems, item.codigo]); // Agregar si no está seleccionado
    }
  };

  // Eliminar un producto del carrito
  const handleRemoveItem = (item) => {
    Alert.alert(
      'Eliminar producto',
      `¿Estás seguro de que deseas eliminar ${item.producto_nombre}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          onPress: () => {
            const updatedCart = cartItems.filter((cartItem) => cartItem.codigo !== item.codigo);
            setCartItems(updatedCart);

            // También actualizamos la lista de seleccionados
            setSelectedItems(selectedItems.filter((id) => id !== item.codigo));

          },
        },
      ]
    );
  };

  // Calcular el precio total de los productos seleccionados
  const calculateTotalPrice = () => {
    return selectedItems.reduce((total, id) => {
      const item = cartItems.find((cartItem) => cartItem.codigo === id);
      return item ? total + item.precio * item.cantidad : total; // Asegurarnos de que el producto existe
    }, 0);
  };

  // Cambiar la cantidad de un producto
  const handleChangeQuantity = (item, quantity) => {
    setCartItems(
      cartItems.map((cartItem) =>
        cartItem.codigo === item.codigo
          ? { ...cartItem, cantidad: quantity }
          : cartItem
      )
    );
  };

  // Procesar pedido y actualizar cantidades en el backend
  const handleSaveChanges = async () => {
    setLoading(true);

    try {
      const updatedProducts = []; // Array para almacenar los datos que se enviarán

      // Iterar sobre los productos seleccionados en el carrito
      for (const item of selectedItems) {
        // Buscar el producto correspondiente en el carrito
        const product = cartItems.find((cartItem) => cartItem.codigo === item);

        // Calcular la nueva cantidad disponible
        const cantidadActualizada = product.cantidadDisponible - product.cantidad;

        // Preparar los datos a enviar
        const productData = {
          id_agricultor: product.agricultor_id,
          nombre: product.producto_nombre,
          precio: parseFloat(product.precio),
          descripcion: product.descripcion,
          cantidadDisponible: parseInt(cantidadActualizada),
          direccion: product.direccion,
        };

        // Agregar el producto a la lista de datos enviados
        updatedProducts.push({ codigo: product.codigo, ...productData });

        // Enviar la solicitud al backend
        await axios.put(`http://192.168.0.17:5000/api/producto/${product.codigo}`, productData);

      }

      Alert.alert("Pedido Procesado", "Las cantidades disponibles se han actualizado correctamente.");
      navigation.goBack(); // Volver a la pantalla anterior después de procesar el pedido
    } catch (error) {
      console.error('Error al procesar el pedido:', error.response?.data || error.message);
      Alert.alert("Error", "Hubo un problema al procesar el pedido.");
    } finally {
      setLoading(false);
    }
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      {/* Botón para seleccionar el producto */}
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => handleSelectItem(item)}
      >
        <Ionicons
          name={
            selectedItems.includes(item.codigo)
              ? 'radio-button-on'
              : 'radio-button-off'
          }
          size={24}
          color="#4CAF50"
        />
      </TouchableOpacity>

      {/* Detalles del producto */}
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.producto_nombre}</Text>
        <Text style={styles.itemSubtitle}>{item.agricultor_nombre}</Text>
        <Text style={styles.itemPrice}>${(item.precio * item.cantidad).toLocaleString()}</Text>
      </View>

      {/* Controles para cambiar cantidad */}
      <View style={styles.itemQuantity}>
        <TouchableOpacity
          onPress={() =>
            handleChangeQuantity(item, Math.max(1, item.cantidad - 1))
          }
        >
          <Ionicons name="remove-circle-outline" size={24} color="#4CAF50" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.cantidad}</Text>
        <TouchableOpacity
          onPress={() =>
            handleChangeQuantity(item, Math.min(item.cantidad + 1, item.cantidadDisponible))
          }
        >
          <Ionicons name="add-circle-outline" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {/* Botón para eliminar el producto */}
      <TouchableOpacity onPress={() => handleRemoveItem(item)}>
        <Ionicons name="trash-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mi Cesta</Text>
        <Ionicons name="cart-outline" size={24} color="white" />
      </View>

      {/* Lista de productos */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.codigo.toString()}
        renderItem={renderCartItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay productos en el carrito.</Text>
        }
      />

      {/* Pie de la pantalla con el precio total */}
      <View style={styles.footer}>
        <Text style={styles.totalPrice}>
          ${calculateTotalPrice().toLocaleString()}
        </Text>
        <TouchableOpacity
          style={styles.orderButton}
          onPress={handleSaveChanges}
          disabled={loading} // Deshabilitar botón mientras se procesa
        >
          <Text style={styles.orderButtonText}>
            {loading ? "Procesando..." : "Hacer Pedido"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6ff',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 15,
    marginVertical: 5,
    elevation: 2,
  },
  selectButton: {
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  itemQuantity: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 100,
    marginHorizontal: 10,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    elevation: 5,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  orderButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
  },
  orderButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
