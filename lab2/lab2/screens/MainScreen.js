import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { newsData } from '../data/newsData';

export default function MainScreen({ navigation }) {
  const [data, setData] = useState(newsData);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setData([...newsData]);
      setRefreshing(false);
    }, 1000);
  };

  const loadMore = () => {
    const more = data.length;
    const newData = Array.from({ length: 10 }, (_, i) => ({
      id: String(more + i + 1),
      title: `News ${more + i + 1}`,
      description: `Description for news ${more + i + 1}`,
      image: '',
    }));
    setData([...data, ...newData]);
  };

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('Details', { item })}>
          <Text style={{ padding: 15 }}>{item.title}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={
        <Text style={{ fontSize: 20, textAlign: 'center', marginVertical: 10 }}>
          News List
        </Text>
      }
      ListFooterComponent={
        <Text style={{ textAlign: 'center', padding: 10 }}>
          End of list
        </Text>
      }
      ItemSeparatorComponent={() => (
        <View style={{ height: 1, backgroundColor: '#ccc' }} />
      )}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      windowSize={5}
    />
  );
}