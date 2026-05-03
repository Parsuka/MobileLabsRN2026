import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from './constants';
import { getFileIcon, getExtension, formatSize, formatDate } from './utils';

export default function FileInfoModal({ visible, item, onClose }) {
  if (!item) return null;
  const ext = item.isDirectory ? 'Папка' : (getExtension(item.name) || 'Невідомий');
  const rows = [
    { label: 'Назва',   value: item.name },
    { label: 'Тип',     value: item.isDirectory ? 'Директорія' : ext.toUpperCase() + ' файл' },
    { label: 'Розмір',  value: item.isDirectory ? '—' : formatSize(item.size) },
    { label: 'Змінено', value: formatDate(item.modificationTime) },
    { label: 'Шлях',    value: item.path },
  ];

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.icon}>{getFileIcon(item)}</Text>
          <Text style={styles.name}>{item.name}</Text>
          {rows.map(({ label, value }) => (
            <View key={label} style={styles.row}>
              <Text style={styles.label}>{label}</Text>
              <Text style={styles.value} numberOfLines={2}>{value}</Text>
            </View>
          ))}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeTxt}>Закрити</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: '#000000AA', justifyContent: 'center', alignItems: 'center', padding: 16 },
  card: { backgroundColor: COLORS.surface, borderRadius: 18, padding: 20, width: '100%', maxWidth: 360 },
  icon: { fontSize: 36, textAlign: 'center', marginBottom: 6 },
  name: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary, textAlign: 'center', marginBottom: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  label: { fontSize: 13, color: COLORS.textSecondary, flex: 1 },
  value: { fontSize: 13, color: COLORS.textPrimary, flex: 2, textAlign: 'right' },
  closeBtn: { marginTop: 16, backgroundColor: COLORS.accent, borderRadius: 10, paddingVertical: 12, alignItems: 'center' },
  closeTxt: { color: '#fff', fontWeight: '700', fontSize: 15 },
});