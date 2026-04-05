import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useApp } from '../context/AppContext';
import GameObject from '../components/GameObject';

export default function HomeScreen({ navigation }) {
  const { state, completedTasks } = useApp();

  const completedCount = completedTasks.filter(task => task.completed).length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text style={styles.title}>Міні-гра з жестами</Text>
        <Text style={styles.score}>Очки: {state.score}</Text>
        <Text style={styles.text}>Кліки: {state.stats.taps}</Text>
        <Text style={styles.text}>Double tap: {state.stats.doubleTaps}</Text>
        <Text style={styles.text}>
          Виконано завдань: {completedCount}/{completedTasks.length}
        </Text>
      </View>

      <GameObject />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Завдання')}
      >
        <Text style={styles.buttonText}>Перейти до завдань</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Налаштування')}
      >
        <Text style={styles.buttonText}>Перейти до налаштувань</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FB',
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 10,
  },
  score: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4F46E5',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  button: {
    backgroundColor: '#4F46E5',
    padding: 16,
    borderRadius: 14,
    marginTop: 14,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});