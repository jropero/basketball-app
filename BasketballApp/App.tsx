import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, ScrollView,
  SafeAreaView, StatusBar, TextInput, ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { basketballTips, getRandomItem } from './data/basketballTips';

export default function App() {
  const [user, setUser] = useState<{ sex: string; age: string } | null>(null);
  const [loading, setLoading] = useState(true);

  // Form states
  const [sex, setSex] = useState('');
  const [age, setAge] = useState('');

  // Content state
  const [quote, setQuote] = useState('');
  const [stretch, setStretch] = useState('');
  const [drill, setDrill] = useState('');

  useEffect(() => {
    loadUser();
    generateNewTips();
  }, []);

  const loadUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('basketball_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.error("Error loading user", e);
    } finally {
      setLoading(false);
    }
  };

  const generateNewTips = () => {
    setQuote(getRandomItem(basketballTips.quotes));
    setStretch(getRandomItem(basketballTips.stretching));
    setDrill(getRandomItem(basketballTips.drills));
  };

  const handleLogin = async () => {
    if (sex && age) {
      const userData = { sex, age };
      setUser(userData);
      await AsyncStorage.setItem('basketball_user', JSON.stringify(userData));
    }
  };

  const handleLogout = async () => {
    setUser(null);
    setSex('');
    setAge('');
    await AsyncStorage.removeItem('basketball_user');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff6a00" />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#0f0c29', '#302b63', '#24243e']}
      style={styles.background}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#0f0c29" />

        <ScrollView contentContainerStyle={styles.scrollContainer}>

          <View style={styles.header}>
            <Text style={styles.title}>Entrenador de Baloncesto</Text>
            <Text style={styles.subtitle}>Tu plan de mejora técnica y mental</Text>
          </View>

          {!user ? (
            /* --- PANTALLA DE LOGIN (FORMULARIO) --- */
            <View style={styles.glassContainer}>
              <Text style={styles.sectionTitle}>Perfil de Jugador</Text>

              <Text style={styles.label}>Sexo</Text>
              <View style={styles.row}>
                {['Hombre', 'Mujer', 'Otro'].map((item) => (
                  <TouchableOpacity
                    key={item}
                    style={[styles.radioBtn, sex === item && styles.radioBtnActive]}
                    onPress={() => setSex(item)}
                  >
                    <Text style={[styles.radioText, sex === item && styles.radioTextActive]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>Edad</Text>
              <TextInput
                style={styles.input}
                placeholder="Ej. 25"
                placeholderTextColor="#a0a0b0"
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
              />

              <TouchableOpacity style={styles.buttonWrapper} onPress={handleLogin}>
                <LinearGradient
                  colors={['#ff6a00', '#ee0979']}
                  style={styles.primaryButton}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.buttonText}>Entrar a la Pista</Text>
                  <Feather name="arrow-right" size={20} color="white" style={{ marginLeft: 8 }} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ) : (
            /* --- PANTALLA DASHBOARD --- */
            <View>
              <View style={styles.dashboardHeader}>
                <View style={styles.userInfo}>
                  <Feather name="user" size={16} color="#ff6a00" />
                  <Text style={styles.userText}>
                    {user.sex === 'Hombre' ? 'Jugador' : user.sex === 'Mujer' ? 'Jugadora' : 'Jugadorx'} | {user.age} años
                  </Text>
                </View>
                <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                  <Feather name="log-out" size={14} color="#a0a0b0" />
                  <Text style={styles.logoutText}>Salir</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.glassContainer}>
                <View style={styles.cardHeader}>
                  <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.iconBox}>
                    <Feather name="activity" size={22} color="white" />
                  </LinearGradient>
                  <Text style={styles.cardTitle}>Prevención y Salud</Text>
                </View>
                <Text style={styles.cardDesc}>{stretch}</Text>
              </View>

              <View style={styles.glassContainer}>
                <View style={styles.cardHeader}>
                  <LinearGradient colors={['#ff6a00', '#ee0979']} style={styles.iconBox}>
                    <FontAwesome5 name="dumbbell" size={18} color="white" />
                  </LinearGradient>
                  <Text style={styles.cardTitle}>Ejercicio de Pista</Text>
                </View>
                <Text style={styles.cardDesc}>{drill}</Text>
              </View>

              <View style={[styles.glassContainer, styles.quoteContainer]}>
                <FontAwesome5 name="quote-right" size={30} color="rgba(255, 106, 0, 0.5)" style={styles.quoteIcon} />
                <Text style={styles.quoteText}>{quote}</Text>
              </View>

              <TouchableOpacity style={styles.buttonWrapper} onPress={generateNewTips}>
                <View style={[styles.primaryButton, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                  <Feather name="refresh-cw" size={18} color="white" style={{ marginRight: 8 }} />
                  <Text style={styles.buttonText}>Generar Nueva Rutina</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0f0c29',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#ffffff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#a0a0b0',
    marginTop: 5,
  },
  glassContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 25,
  },
  label: {
    color: '#a0a0b0',
    fontSize: 14,
    marginBottom: 8,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  radioBtn: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 4,
    alignItems: 'center',
  },
  radioBtnActive: {
    borderColor: '#ff6a00',
    backgroundColor: 'rgba(255, 106, 0, 0.1)',
  },
  radioText: {
    color: '#a0a0b0',
    fontWeight: '600',
  },
  radioTextActive: {
    color: '#ffffff',
  },
  input: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 30,
  },
  buttonWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 10,
  },
  primaryButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dashboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  userText: {
    color: '#ffffff',
    marginLeft: 8,
    fontWeight: '600',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  logoutText: {
    color: '#a0a0b0',
    marginLeft: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  cardDesc: {
    color: '#a0a0b0',
    fontSize: 16,
    lineHeight: 24,
  },
  quoteContainer: {
    backgroundColor: 'rgba(255, 106, 0, 0.05)',
    borderColor: 'rgba(255, 106, 0, 0.2)',
    alignItems: 'center',
    paddingVertical: 35,
  },
  quoteIcon: {
    marginBottom: 15,
  },
  quoteText: {
    color: '#ffffff',
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 28,
  }
});