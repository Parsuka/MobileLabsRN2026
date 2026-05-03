import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from './constants';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>📂 Файловий менеджер</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
});