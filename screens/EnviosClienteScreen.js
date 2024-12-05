import React, { useState, useEffect }  from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';



const imagenes = [
    require('../assets/Ruta1.png'),
    require('../assets/Ruta2.png'),
    require('../assets/Ruta3.png'),
    require('../assets/Ruta4.png'),
    require('../assets/Ruta5.png'),
    require('../assets/Ruta6.png'),
  ];


  const EnviosClienteScreen = ({navigation}) => {

    const [imagenSeleccionada] = useState(
        imagenes[Math.floor(Math.random() * imagenes.length)]
    );

    const transportadores = [
        {
          nombre: "Jose Mario",
          placa: "LKJ 26L",
          imagen: require('../assets/transportador.png'),
        },
        {
          nombre: "Ana Rodríguez",
          placa: "XYZ 89M",
          imagen: require('../assets/transportador.png'),
        },
        {
          nombre: "Sebastian Jimenez",
          placa: "JDV 84D",
          imagen: require('../assets/transportador.png'),
        },
        {
          nombre: "Juan Idrobo",
          placa: "LDO 32M",
          imagen: require('../assets/transportador.png'),
        },
        {
          nombre: "Carlos Pérez",
          placa: "ABC 45X",
          imagen: require('../assets/transportador.png'),
        },
      ];

      const [transportador] = useState(
        transportadores[Math.floor(Math.random() * transportadores.length)]
      );

    const telefono = {
        imagen2: require('../assets/telefono.png'),
    };

    const mensaje = {
        imagen2: require('../assets/mesaje.png'),
    };

    const [estadoEnvio, setEstadoEnvio] = useState([
        { id: 1, texto: "Transportador asignado", completo: false },
        { id: 2, texto: "Pedido Recogido", completo: false },
        { id: 3, texto: "El transportador se dirige a tu dirección", completo: false },
        { id: 4, texto: "Pedido entregado", completo: false },
  ]);

  const [temporizadores, setTemporizadores] = useState([]);

  useEffect(() => {
    iniciarTemporizadores();


    return () => {
      temporizadores.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const iniciarTemporizadores = () => {

    temporizadores.forEach((timer) => clearTimeout(timer));

    const nuevosTemporizadores = [
      setTimeout(() => actualizarEstado(0), 5000),
      setTimeout(() => actualizarEstado(1), 10000),
      setTimeout(() => actualizarEstado(2), 15000),
    ];

    setTemporizadores(nuevosTemporizadores);
  };

  const reiniciarEstados = () => {
    setEstadoEnvio([
      { id: 1, texto: "Transportador asignado", completo: false },
      { id: 2, texto: "Pedido Recogido", completo: false },
      { id: 3, texto: "El transportador se dirige a tu dirección", completo: false },
      { id: 4, texto: "Pedido entregado", completo: false },
    ]);
    iniciarTemporizadores(); 
  };

  const actualizarEstado = (index) => {
    setEstadoEnvio((prevEstado) =>
      prevEstado.map((estado, i) => (i === index ? { ...estado, completo: true } : estado))
    );
  };

  const marcarPedidoEntregado = () => {
    actualizarEstado(3); 
    navigation.navigate('Login');
    
  };


  return (
    <ScrollView style={styles.container}>
      {/* Título */}
      <Text style={styles.titulo}>Detalles de tu envío</Text>

      {/* Imagen */}
      <View style={styles.imagenContenedor}>
      <Image source={imagenSeleccionada} style={styles.imagen}/>
      </View>
    {/* Información del transportador */}
    <View style={styles.transportadorInfoContainer}>
        {/* Información del transportador */}
        <View style={styles.transportadorInfo}>
            <Text style={styles.texto}>
            <Text style={styles.textoBold2}>{transportador.placa}</Text>
            </Text>
            <Text style={styles.texto}>
            <Text style={styles.textoBold}>{transportador.nombre}</Text>
            </Text>
        </View>
        {/* Imagen del transportador */}
        <Image source={transportador.imagen} style={styles.transportadorImagen} />
    </View>

      {/* Línea de tiempo del envío */}
      <View style={styles.timeline}>
        {estadoEnvio.map((estado) => (
          <View key={estado.id} style={styles.timelineItem}>
            <View
              style={[
                styles.timelineMarker,
                estado.completo && styles.timelineMarkerComplete,
              ]}
            />
            <Text
              style={[
                styles.timelineTexto,
                estado.completo && styles.textoCompleto,
              ]}
            >
              {estado.texto}
            </Text>
          </View>
        ))}
      </View>

      {/* Botón de acción */}
      <View style={styles.BotonContainer}>
      {/* Imagen del transportador */}
      <Image source={telefono.imagen2} style={styles.IconImagen} />
      {/* Imagen del transportador */}
      <Image source={mensaje.imagen2} style={styles.IconImagen} />
      <TouchableOpacity style={styles.boton} onPress={marcarPedidoEntregado}>
        <Text style={styles.botonTexto}>Pedido Recibido</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5ba73b',
    marginVertical: 16,
    textAlign: 'center',
  },
  imagen: {
    width: 272,
    height: 269,
    resizeMode: 'contain',
    borderRadius: 10,
    marginBottom: 16,
  },
  imagenContenedor: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagen2: {
    width: 262,
    height: 249,
    resizeMode: 'contain',
    borderRadius: 10,
    marginBottom: 16,
  },
  transportadorInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  transportadorInfo: {
    padding: 10,
    marginStart: 60,
    marginEnd: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  transportadorImagen: {
    width: 50,
    height: 50,
    marginStart: 30,
    marginEnd: 30,
    borderRadius: 25,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#2E7D32',
  },
  IconImagen: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#5ba73b',
  },
  texto: {
    color: '#4A4A4A',
  },
  textoBold: {
    fontSize: 14,
    color: '#4A4A4A',
  },
  textoBold2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  timeline: {
    marginBottom: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  timelineMarker: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#a0a59e',
    marginRight: 8,
  },
  timelineMarkerComplete: {
    backgroundColor: '#2E7D32',
  },
  timelineTexto: {
    fontSize: 14,
    color: '#a0a59e',
  },
  textoCompleto: {
    color: '#2E7D32',
  },
  boton: {
    backgroundColor: '#5ba73b',
    paddingHorizontal: 50,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  botonTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  BotonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 1,
    borderRadius: 10,
    marginBottom: 16,
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

export default EnviosClienteScreen;