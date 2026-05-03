export const formatSize = (bytes) => {
  if (bytes === null || bytes === undefined) return '—';
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

export const formatDate = (modTime) => {
  if (!modTime) return '—';
  return new Date(modTime * 1000).toLocaleString('uk-UA', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
};

export const getExtension = (name) => {
  const parts = name.split('.');
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
};

export const getFileIcon = (item) => {
  if (item.isDirectory) return '📁';
  const ext = getExtension(item.name);
  const icons = {
    txt: '📄', json: '🔧', js: '⚡', md: '📝',
    png: '🖼️', jpg: '🖼️', jpeg: '🖼️',
  };
  return icons[ext] || '📎';
};