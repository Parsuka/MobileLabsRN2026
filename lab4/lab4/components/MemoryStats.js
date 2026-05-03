import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getFreeDiskStorageAsync, getTotalDiskCapacityAsync } from './fileSystem';
import { COLORS } from './constants';
import { formatSize } from './utils';

const StatPill = ({ label, value, color }) => (
  <View style={[styles.statPill, { borderColor: color + '44' }]}>
    <Text style={[styles.statValue, { color }]}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

export default function MemoryStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const free = await FileSystem.getFreeDiskStorageAsync();
        const total = await FileSystem.getTotalDiskCapacityAsync();
        setStats({ free, total, used: total - free });
      } catch {
        setStats(null);
      }
    })();
  }, []);

  if (!stats) return null;

  const usedPct = Math.round((stats.used / stats.total) * 100);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>💾 Пам'ять пристрою</Text>
      <View style={styles.row}>
        <StatPill label="Всього" value={formatSize(stats.total)} color={COLORS.accent} />
        <StatPill label="Зайнято" value={formatSize(stats.used)} color={COLORS.danger} />
        <StatPill label="Вільно" value={formatSize(stats.free)} color={COLORS.success} />
      </View>
      <View style={styles.progressBg}>
        <View style={[
          styles.progressFill,
          { width: `${usedPct}%`, backgroundColor: usedPct > 80 ? COLORS.danger : COLORS.accent }
        ]} />
      </View>
      <Text style={styles.progressLabel}>{usedPct}% використано</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 12, padding: 14,
    backgroundColor: COLORS.surface,
    borderRadius: 14, borderWidth: 1, borderColor: COLORS.border,
  },
  title: { fontSize: 13, fontWeight: '600', color: COLORS.textSecondary, marginBottom: 10 },
  row: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  statPill: {
    flex: 1, alignItems: 'center', paddingVertical: 8,
    borderRadius: 10, borderWidth: 1, backgroundColor: COLORS.card,
  },
  statValue: { fontSize: 14, fontWeight: '700' },
  statLabel: { fontSize: 11, color: COLORS.textMuted, marginTop: 2 },
  progressBg: { height: 6, backgroundColor: COLORS.card, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: 6, borderRadius: 3 },
  progressLabel: { fontSize: 11, color: COLORS.textMuted, marginTop: 5, textAlign: 'right' },
});