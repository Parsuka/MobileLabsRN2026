import AsyncStorage from '@react-native-async-storage/async-storage';

const FS_KEY = 'FILESYSTEM_V1';

const load = async () => {
  try {
    const raw = await AsyncStorage.getItem(FS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
};

const save = async (fs) => {
  try { await AsyncStorage.setItem(FS_KEY, JSON.stringify(fs)); } catch {}
};

export const documentDirectory = 'file:///documents/';

export const readDirectoryAsync = async (path) => {
  const fs = await load();
  const prefix = path.endsWith('/') ? path : path + '/';
  const names = new Set();
  Object.keys(fs).forEach((key) => {
    if (key.startsWith(prefix) && key !== prefix) {
      const rest = key.slice(prefix.length);
      const parts = rest.split('/');
      if (parts[0]) names.add(parts[0]);
    }
  });
  return [...names];
};

export const getInfoAsync = async (path, opts = {}) => {
  const fs = await load();
  if (fs[path]) {
    const entry = fs[path];
    return {
      exists: true,
      isDirectory: entry.type === 'dir',
      size: entry.size || 0,
      modificationTime: Math.floor(entry.modified / 1000),
      uri: path,
    };
  }
  const dirPath = path.endsWith('/') ? path : path + '/';
  if (fs[dirPath]) {
    return {
      exists: true,
      isDirectory: true,
      size: 0,
      modificationTime: Math.floor(fs[dirPath].modified / 1000),
      uri: dirPath,
    };
  }
  const hasChildren = Object.keys(fs).some((k) => k.startsWith(dirPath));
  if (hasChildren || dirPath === documentDirectory) {
    return { exists: true, isDirectory: true, size: 0, modificationTime: Date.now() / 1000, uri: dirPath };
  }
  return { exists: false, isDirectory: false, size: 0, modificationTime: null, uri: path };
};

export const makeDirectoryAsync = async (path, opts = {}) => {
  const fs = await load();
  const dirPath = path.endsWith('/') ? path : path + '/';
  fs[dirPath] = { type: 'dir', created: Date.now(), modified: Date.now() };
  await save(fs);
};

export const writeAsStringAsync = async (path, content) => {
  const fs = await load();
  const size = new Blob([content]).size;
  fs[path] = {
    type: 'file',
    content,
    size,
    created: fs[path]?.created || Date.now(),
    modified: Date.now(),
  };
  await save(fs);
};

export const readAsStringAsync = async (path) => {
  const fs = await load();
  return fs[path]?.content || '';
};

export const deleteAsync = async (path, opts = {}) => {
  const fs = await load();
  const toDelete = Object.keys(fs).filter(
    (k) => k === path || k === path + '/' || k.startsWith(path + '/') || k.startsWith(path)
  );
  toDelete.forEach((k) => delete fs[k]);
  await save(fs);
};

export const getFreeDiskStorageAsync = async () => 10 * 1024 * 1024 * 1024;
export const getTotalDiskCapacityAsync = async () => 64 * 1024 * 1024 * 1024;