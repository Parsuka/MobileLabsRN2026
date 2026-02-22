import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const news = Array.from({ length: 8 }, (_, i) => ({
  id: String(i),
  title: 'Заголовок новини',
  date: 'Дата новини',
  text: 'Короткий текст новини',
}));

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={news}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Text style={styles.screenTitle}>Новини</Text>}
        renderItem={({ item }) => (
          <View style={styles.newsItem}>
            <Image
              style={styles.newsImage}
              source={{ uri: 'https://via.placeholder.com/60' }}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.newsTitle}>{item.title}</Text>
              <Text style={styles.newsDate}>{item.date}</Text>
              <Text style={styles.newsText}>{item.text}</Text>
            </View>
          </View>
        )}
      />
      <Text style={styles.footer}>Ярошук Даниїл Володимирович, ІПЗ-24-5</Text>{' '}
    </View>
  );
}

const styles = StyleSheet.create({
  screenTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 16,
  },
  newsItem: {
    flexDirection: 'row',
    padding: 10,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  newsImage: { width: 60, height: 60, backgroundColor: '#ddd' },
  newsTitle: { fontWeight: 'bold' },
  newsDate: { color: 'gray', fontSize: 12 },
  newsText: { fontSize: 12 },
  footer: {
    textAlign: 'center',
    padding: 10,
    color: 'gray',
    fontStyle: 'italic',
  },
});
