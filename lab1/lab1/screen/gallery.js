import React from 'react';
import { View, FlatList, StyleSheet, Dimensions, Text } from 'react-native';

const photos = Array.from({ length: 10 }, (_, i) => ({ id: String(i) }));
const size = Dimensions.get('window').width / 2 - 15;

export default function GalleryScreen() {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ padding: 10 }}
        renderItem={() => (
          <View style={[styles.photo, { width: size, height: size }]} />
        )}
      />
      <Text style={styles.footer}>Ярошук Даниїл Володимирович, ІПЗ-24-5</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  photo: { backgroundColor: '#f0f0f0', margin: 5, borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
  footer: { textAlign: 'center', padding: 10, color: 'gray', fontStyle: 'italic' },
});