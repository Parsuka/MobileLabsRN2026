import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useApp } from '../context/AppContext';

export default function GameObject() {
  const { registerTap } = useApp();

  const tap = Gesture.Tap().onEnd((_, success) => {
    if (success) {
      registerTap();
    }
  });

  return (
    <View style={styles.wrapper}>
      <GestureDetector gesture={tap}>
        <View style={styles.circle}>
          <Text style={styles.emoji}>🎯</Text>
        </View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  circle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#8B5CF6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 56,
  },
});