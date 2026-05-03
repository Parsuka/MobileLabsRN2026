import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { makeDirectoryAsync, writeAsStringAsync } from './fileSystem';
import { COLORS } from './constants';

export default function CreateModal({ visible, currentPath, onClose, onCreated }) {
  const [type, setType] = useState('folder');
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const reset = () => { setName(''); setContent(''); setType('folder'); };

  const handleCreate = async () => {
    const trimmed = name.trim();
    if (!trimmed) { Alert.alert('Помилка', 'Введіть назву'); return; }
    try {
      if (type === 'folder') {
        await makeDirectoryAsync(currentPath + trimmed + '/');
      } else {
        const fname = trimmed.endsWith('.txt') ? trimmed : trimmed + '.txt';
        await writeAsStringAsync(currentPath + fname, content);
      }
      reset(); onCreated(); onClose();
    } catch (e) {
      Alert.alert('Помилка', e.message);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={() => { reset(); onClose(); }}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>Створити</Text>
          <View style={styles.segmentRow}>
            {['folder', 'file'].map((t) => (
              <TouchableOpacity
                key={t}
                style={[styles.segment, type === t && styles.segmentActive]}
                onPress={() => setType(t)}
              >
                <Text style={[styles.segmentTxt, type === t && styles.segmentTxtActive]}>
                  {t === 'folder' ? '📁 Папка' : '📄 Файл .txt'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            style={styles.input}
            placeholder={type === 'folder' ? 'Назва папки' : 'Назва файлу'}
            placeholderTextColor={COLORS.textMuted}
            value={name}
            onChangeText={setName}
            autoFocus
          />
          {type === 'file' && (
            <TextInput
              style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
              placeholder="Початковий вміст (необов'язково)"
              placeholderTextColor={COLORS.textMuted}
              value={content}
              onChangeText={setContent}
              multiline
            />
          )}
          <View style={styles.btns}>
            <TouchableOpacity style={styles.cancelBtn} onPress={() => { reset(); onClose(); }}>
              <Text style={styles.cancelTxt}>Скасувати</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.createBtn} onPress={handleCreate}>
              <Text style={styles.createTxt}>Створити</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: '#000000AA', justifyContent: 'center', alignItems: 'center', padding: 16 },
  card: { backgroundColor: COLORS.surface, borderRadius: 18, padding: 20, width: '100%', maxWidth: 380 },
  title: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 16 },
  segmentRow: { flexDirection: 'row', backgroundColor: COLORS.card, borderRadius: 10, padding: 4, marginBottom: 14 },
  segment: { flex: 1, paddingVertical: 8, borderRadius: 8, alignItems: 'center' },
  segmentActive: { backgroundColor: COLORS.accent },
  segmentTxt: { fontSize: 13, color: COLORS.textSecondary, fontWeight: '500' },
  segmentTxtActive: { color: '#fff' },
  input: {
    backgroundColor: COLORS.card, borderRadius: 10, borderWidth: 1, borderColor: COLORS.border,
    paddingHorizontal: 14, paddingVertical: 12, color: COLORS.textPrimary, fontSize: 14, marginBottom: 12,
  },
  btns: { flexDirection: 'row', gap: 10, marginTop: 4 },
  cancelBtn: { flex: 1, paddingVertical: 12, borderRadius: 10, borderWidth: 1, borderColor: COLORS.border, alignItems: 'center' },
  cancelTxt: { color: COLORS.textSecondary, fontWeight: '600' },
  createBtn: { flex: 1, paddingVertical: 12, borderRadius: 10, backgroundColor: COLORS.accent, alignItems: 'center' },
  createTxt: { color: '#fff', fontWeight: '700' },
});