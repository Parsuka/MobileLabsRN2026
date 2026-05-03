import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS } from './constants';
import { getFileIcon, formatSize, formatDate } from './utils';

const FileItem = ({ item, onPress, onLongPress }) => (
  <TouchableOpacity
    style={styles.item}
    onPress={() => onPress(item)}
    onLongPress={() => onLongPress(item)}
    activeOpacity={0.7}
  >
    <Text style={styles.icon}>{getFileIcon(item)}</Text>
    <View style={styles.info}>
      <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.meta}>
        {item.isDirectory ? 'Папка' : formatSize(item.size)}
        {item.modificationTime ? `  •  ${formatDate(item.modificationTime)}` : ''}
      </Text>
    </View>
    <Text style={styles.chevron}>›</Text>
  </TouchableOpacity>
);

const EmptyState = () => (
  <View style={styles.empty}>
    <Text style={styles.emptyIcon}>🗂️</Text>
    <Text style={styles.emptyTxt}>Директорія порожня</Text>
    <Text style={styles.emptyHint}>Натисніть + щоб створити файл або папку</Text>
  </View>
);

export default function FileList({ items, loading, onPress, onLongPress }) {
  if (loading) return <ActivityIndicator color={COLORS.accent} style={{ flex: 1, marginTop: 40 }} />;
  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.path}
      renderItem={({ item }) => (
        <FileItem item={item} onPress={onPress} onLongPress={onLongPress} />
      )}
      ListEmptyComponent={<EmptyState />}
      contentContainerStyle={{ paddingBottom: 100 }}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, paddingVertical: 13,
    borderBottomWidth: 1, borderBottomColor: COLORS.border + '80',
  },
  icon: { fontSize: 22, marginRight: 12 },
  info: { flex: 1 },
  name: { fontSize: 15, color: COLORS.textPrimary, fontWeight: '500' },
  meta: { fontSize: 12, color: COLORS.textMuted, marginTop: 2 },
  chevron: { fontSize: 20, color: COLORS.textMuted, marginLeft: 8 },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyTxt: { fontSize: 16, color: COLORS.textSecondary, fontWeight: '600' },
  emptyHint: { fontSize: 13, color: COLORS.textMuted, marginTop: 6 },
});