import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';

export default function TasksScreen() {
  const { completedTasks } = useApp();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {completedTasks.map(task => (
        <View key={task.id} style={styles.card}>
          <Text style={styles.title}>{task.title}</Text>
          <Text style={styles.description}>{task.description}</Text>
          <Text
            style={[
              styles.status,
              { color: task.completed ? '#16A34A' : '#DC2626' },
            ]}
          >
            {task.completed ? 'Виконано' : 'Не виконано'}
          </Text>
        </View>
      ))}
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
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 6,
  },
  description: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 10,
  },
  status: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});