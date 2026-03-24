import React from 'react';
import { View, Text } from 'react-native';

export default function DetailsScreen({ route }) {
  const item = route.params?.item;

  if (!item) {
    return (
      <View style={{ padding: 20 }}>
        <Text>No data received</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>{item.title}</Text>
      <Text>{item.description}</Text>
    </View>
  );
}