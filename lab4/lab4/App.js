import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Alert } from 'react-native';

import { COLORS } from './components/constants';
import { documentDirectory, deleteAsync } from './components/fileSystem';
import { getExtension } from './components/utils';
import { useDirectory } from './components/useDirectory';
import Header from './components/Header';
import NavBar from './components/NavBar';
import MemoryStats from './components/MemoryStats';
import FileList from './components/FileList';
import FloatingButton from './components/FloatingButton';
import CreateModal from './components/CreateModal';
import ActionMenu from './components/ActionMenu';
import FileInfoModal from './components/FileInfoModal';
import TextEditorModal from './components/TextEditorModal';

const ROOT_DIR = documentDirectory;

export default function App() {
  const [currentPath, setCurrentPath] = useState(ROOT_DIR);
  const { items, loading, refresh } = useDirectory(currentPath);

  const [selectedItem, setSelectedItem] = useState(null);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  const navigate = (path) => setCurrentPath(path.endsWith('/') ? path : path + '/');

  const goUp = () => {
    if (currentPath === ROOT_DIR) return;
    const parts = currentPath.replace(ROOT_DIR, '').split('/').filter(Boolean);
    parts.pop();
    setCurrentPath(parts.length === 0 ? ROOT_DIR : ROOT_DIR + parts.join('/') + '/');
  };

  const handlePress = (item) => {
    if (item.isDirectory) {
      navigate(item.path);
    } else if (getExtension(item.name) === 'txt') {
      setSelectedItem(item);
      setShowEditor(true);
    } else {
      setSelectedItem(item);
      setShowInfo(true);
    }
  };

  const handleLongPress = (item) => {
    setSelectedItem(item);
    setShowActionMenu(true);
  };

  const handleDelete = () => {
    setShowActionMenu(false);
    if (!selectedItem) return;
    Alert.alert(
      'Підтвердження видалення',
      `Видалити "${selectedItem.name}"?`,
      [
        { text: 'Скасувати', style: 'cancel' },
        {
          text: 'Видалити', style: 'destructive',
          onPress: async () => {
            try {
              await deleteAsync(selectedItem.path, { idempotent: true });
              refresh();
            } catch (e) {
              Alert.alert('Помилка', e.message);
            }
          },
        },
      ]
    );
  };

  const isRoot = currentPath === ROOT_DIR;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />
      <Header />
      {isRoot && <MemoryStats />}
      <NavBar
        currentPath={currentPath}
        isRoot={isRoot}
        onGoUp={goUp}
        onNavigate={navigate}
      />
      <FileList
        items={items}
        loading={loading}
        onPress={handlePress}
        onLongPress={handleLongPress}
      />
      <FloatingButton onPress={() => setShowCreate(true)} />
      <CreateModal
        visible={showCreate}
        currentPath={currentPath}
        onClose={() => setShowCreate(false)}
        onCreated={refresh}
      />
      <ActionMenu
        visible={showActionMenu}
        item={selectedItem}
        onClose={() => setShowActionMenu(false)}
        onDelete={handleDelete}
        onInfo={() => { setShowActionMenu(false); setShowInfo(true); }}
        onEdit={() => { setShowActionMenu(false); setShowEditor(true); }}
      />
      <FileInfoModal
        visible={showInfo}
        item={selectedItem}
        onClose={() => setShowInfo(false)}
      />
      <TextEditorModal
        visible={showEditor}
        filePath={selectedItem?.path}
        fileName={selectedItem?.name}
        onClose={() => setShowEditor(false)}
        onSave={refresh}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bg },
});