import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';

export default function SettingsScreen() {
  const { state, toggleTheme, resetProgress } = useApp();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Налаштування</Text>
        <Text style={styles.text}>
          Поточна тема: {state.themeMode === 'light' ? 'Світла' : 'Темна'}
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={toggleTheme}>
        <Text style={styles.buttonText}>Змінити тему</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.dangerButton} onPress={resetProgress}>
        <Text style={styles.buttonText}>Скинути прогрес</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FB',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#111827',
  },
  button: {
    backgroundColor: '#4F46E5',
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
  },
  dangerButton: {
    backgroundColor: '#DC2626',
    padding: 16,
    borderRadius: 14,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});