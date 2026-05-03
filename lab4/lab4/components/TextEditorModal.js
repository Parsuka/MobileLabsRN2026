import React, { useState, useEffect } from 'react';
import {
  Modal, SafeAreaView, View, Text, TextInput,
  TouchableOpacity, Alert, ActivityIndicator, Platform, StyleSheet,
} from 'react-native';
import { readAsStringAsync, writeAsStringAsync } from './fileSystem';
import { COLORS } from './constants';

export default function TextEditorModal({ visible, filePath, fileName, onClose, onSave }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible && filePath) {
      setLoading(true);
      FileSystem.readAsStringAsync(filePath)
        .then(setContent)
        .catch(() => setContent(''))
        .finally(() => setLoading(false));
    }
  }, [visible, filePath]);

  const handleSave = async () => {
    try {
      await FileSystem.writeAsStringAsync(filePath, content);
      onSave();
      onClose();
    } catch {
      Alert.alert('Помилка', 'Не вдалося зберегти файл');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.btn}>
            <Text style={styles.btnTxt}>✕ Закрити</Text>
          </TouchableOpacity>
          <Text style={styles.title} numberOfLines={1}>{fileName}</Text>
          <TouchableOpacity onPress={handleSave} style={[styles.btn, styles.btnPrimary]}>
            <Text style={[styles.btnTxt, { color: '#fff' }]}>Зберегти</Text>
          </TouchableOpacity>
        </View>
        {loading
          ? <ActivityIndicator color={COLORS.accent} style={{ flex: 1 }} />
          : <TextInput
              style={styles.editor}
              multiline
              value={content}
              onChangeText={setContent}
              placeholder="Вміст файлу..."
              placeholderTextColor={COLORS.textMuted}
              autoCorrect={false}
              spellCheck={false}
            />
        }
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 12, paddingVertical: 10,
    backgroundColor: COLORS.surface, borderBottomWidth: 1, borderBottomColor: COLORS.border,
  },
  title: { flex: 1, textAlign: 'center', fontSize: 14, fontWeight: '600', color: COLORS.textPrimary, marginHorizontal: 8 },
  btn: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: COLORS.border },
  btnPrimary: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  btnTxt: { fontSize: 13, color: COLORS.textSecondary, fontWeight: '500' },
  editor: {
    flex: 1, padding: 16, fontSize: 14,
    color: COLORS.textPrimary,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    lineHeight: 22, textAlignVertical: 'top',
  },
});