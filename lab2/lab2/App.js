import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, StyleSheet, Modal, SafeAreaView } from 'react-native';
import MainScreen from './screens/MainScreen';
import DetailsScreen from './screens/DetailsScreen';
import ContactsScreen from './screens/ContactsScreen';

const Stack = createStackNavigator();

function CustomDrawer({ visible, onClose, onNavigate }) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.drawer}>
          <Text style={styles.drawerTitle}>Меню</Text>
          <TouchableOpacity style={styles.drawerItem} onPress={() => onNavigate('News')}>
            <Text style={styles.drawerItemText}>📰 Новини</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerItem} onPress={() => onNavigate('Contacts')}>
            <Text style={styles.drawerItemText}>📞 Контакти</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeBtnText}>✕ Закрити</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('News');

  const handleNavigate = (screen) => {
    setCurrentScreen(screen);
    setDrawerOpen(false);
  };

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setDrawerOpen(true)}>
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {currentScreen === 'News' ? 'Новини' : 'Контакти'}
          </Text>
        </View>
        <CustomDrawer
          visible={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          onNavigate={handleNavigate}
        />
        {currentScreen === 'News' ? (
          <Stack.Navigator>
            <Stack.Screen name="Main" component={MainScreen} options={{ title: 'Новини' }} />
            <Stack.Screen
              name="Details"
              component={DetailsScreen}
              options={({ route }) => ({ title: route.params?.item?.title || 'Деталі' })}
            />
          </Stack.Navigator>
        ) : (
          <ContactsScreen />
        )}
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6200ee',
    padding: 14,
  },
  menuIcon: { fontSize: 24, color: '#fff', marginRight: 16 },
  headerTitle: { fontSize: 18, color: '#fff', fontWeight: 'bold' },
  overlay: { flex: 1, flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.5)' },
  drawer: { width: 260, backgroundColor: '#fff', padding: 24 },
  drawerTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 24, color: '#6200ee' },
  drawerItem: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#eee' },
  drawerItemText: { fontSize: 16 },
  closeBtn: { marginTop: 24 },
  closeBtnText: { color: 'red', fontSize: 16 },
});