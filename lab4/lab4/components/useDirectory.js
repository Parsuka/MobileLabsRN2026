import { useState, useEffect, useCallback } from 'react';
import * as FileSystem from './fileSystem';

export const useDirectory = (path) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!path) return;
    setLoading(true);
    try {
      const entries = await FileSystem.readDirectoryAsync(path);
      const detailed = await Promise.all(
        entries.map(async (name) => {
          const fullPath = path + name;
          try {
            const info = await FileSystem.getInfoAsync(fullPath, { size: true });
            return {
              name,
              path: info.isDirectory ? fullPath + '/' : fullPath,
              isDirectory: info.isDirectory,
              size: info.size,
              modificationTime: info.modificationTime,
            };
          } catch {
            return { name, path: fullPath, isDirectory: false, size: 0, modificationTime: null };
          }
        })
      );
      detailed.sort((a, b) => {
        if (a.isDirectory !== b.isDirectory) return a.isDirectory ? -1 : 1;
        return a.name.localeCompare(b.name);
      });
      setItems(detailed);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [path]);

  useEffect(() => { refresh(); }, [refresh]);

  return { items, loading, refresh };
};