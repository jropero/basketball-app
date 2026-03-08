import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { basketballTips, getRandomItem } from './data/basketballTips'; // Asegúrate de que la ruta sea correcta

export default function App() {
  // Estados para guardar los elementos actuales
  const [quote, setQuote] = useState(getRandomItem(basketballTips.quotes));
  const [stretch, setStretch] = useState(getRandomItem(basketballTips.stretching));
  const [drill, setDrill] = useState(getRandomItem(basketballTips.drills));

  // Función para obtener nuevos consejos al azar
  const generateNewTips = () => {
    setQuote(getRandomItem(basketballTips.quotes));
    setStretch(getRandomItem(basketballTips.stretching));
    setDrill(getRandomItem(basketballTips.drills));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#e56b1f" />
      <ScrollView contentContainerStyle={styles.container}>

        <Text style={styles.header}>Basketball Pro Tips 🏀</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🔥 Inspiración</Text>
          <Text style={styles.quoteText}>{quote}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🧘‍♂️ Estiramiento</Text>
          <Text style={styles.cardText}>{stretch}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🏃‍♂️ Ejercicio (Drill)</Text>
          <Text style={styles.cardText}>{drill}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={generateNewTips}>
          <Text style={styles.buttonText}>Generar Nuevos</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

// Estilos de la aplicación
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  container: {
    padding: 20,
    alignItems: 'center',
    paddingBottom: 40,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e56b1f', // Color naranja básquet
    marginBottom: 20,
    marginTop: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    width: '100%',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4, // Sombra en Android
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#444',
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#e56b1f',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});