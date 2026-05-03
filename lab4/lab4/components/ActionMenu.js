import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from './constants';
import { getFileIcon, getExtension } from './utils';

export default function ActionMenu({ visible, item, onClose, onDelete, onInfo, onEdit }) {
  if (!item) return null;
  const isTxt = !item.isDirectory && getExtension(item.name) === 'txt';

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <View style={styles.card}>
          <Text style={styles.title} numberOfLines={1}>{getFileIcon(item)} {item.name}</Text>
          {isTxt && (
            <TouchableOpacity style={styles.item} onPress={onEdit}>
              <Text style={styles.itemIcon}>✏️</Text>
              <Text style={styles.itemTxt}>Редагувати</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.item} onPress={onInfo}>
            <Text style={styles.itemIcon}>ℹ️</Text>
            <Text style={styles.itemTxt}>Детальна інформація</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.item} onPress={onDelete}>
            <Text style={styles.itemIcon}>🗑️</Text>
            <Text style={[styles.itemTxt, { color: COLORS.danger }]}>Видалити</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: '#000000AA', justifyContent: 'center', alignItems: 'center', padding: 16 },
  card: { backgroundColor: COLORS.surface, borderRadius: 18, width: '100%', maxWidth: 320, overflow: 'hidden' },
  title: { fontSize: 14, color: COLORS.textSecondary, padding: 16, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  item: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  itemIcon: { fontSize: 18, marginRight: 12 },
  itemTxt: { fontSize: 15, color: COLORS.textPrimary },
  divider: { height: 1, backgroundColor: COLORS.border },
});