import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { documentDirectory } from './fileSystem';
import { COLORS } from './constants';

const ROOT_DIR = documentDirectory;

const Breadcrumb = ({ path, onNavigate }) => {
  const parts = path.replace(ROOT_DIR, '').split('/').filter(Boolean);
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.breadcrumbContainer}>
      <TouchableOpacity onPress={() => onNavigate(ROOT_DIR)}>
        <Text style={[styles.crumb, styles.crumbRoot]}>Головна</Text>
      </TouchableOpacity>
      {parts.map((part, i) => {
        const targetPath = ROOT_DIR + parts.slice(0, i + 1).join('/') + '/';
        return (
          <View key={i} style={styles.crumbPart}>
            <Text style={styles.crumbSep}> / </Text>
            <TouchableOpacity onPress={() => onNavigate(targetPath)}>
              <Text style={[styles.crumb, i === parts.length - 1 && styles.crumbActive]}>
                {part}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default function NavBar({ currentPath, isRoot, onGoUp, onNavigate }) {
  return (
    <View style={styles.navBar}>
      {!isRoot && (
        <TouchableOpacity onPress={onGoUp} style={styles.upBtn}>
          <Text style={styles.upBtnTxt}>⬆ Вгору</Text>
        </TouchableOpacity>
      )}
      <Breadcrumb path={currentPath} onNavigate={onNavigate} />
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  upBtn: {
    marginRight: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: COLORS.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  upBtnTxt: { color: COLORS.accent, fontSize: 12, fontWeight: '600' },
  breadcrumbContainer: { flex: 1 },
  crumbPart: { flexDirection: 'row', alignItems: 'center' },
  crumb: { fontSize: 12, color: COLORS.textSecondary, paddingVertical: 4 },
  crumbRoot: { color: COLORS.accentLight, fontWeight: '600' },
  crumbActive: { color: COLORS.textPrimary, fontWeight: '600' },
  crumbSep: { color: COLORS.textMuted, fontSize: 12 },
});