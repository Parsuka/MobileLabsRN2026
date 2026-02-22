import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screen/home';
import GalleryScreen from './screen/gallery';
import ProfileScreen from './screen/profile';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>FirstMobileApp</Text>
      </View>
      <NavigationContainer>
        <Tab.Navigator
          tabBarPosition="top"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color }) => {
              let iconName;
              if (route.name === 'Головна') iconName = 'home';
              else if (route.name === 'Фотогалерея') iconName = 'images';
              else if (route.name === 'Профіль') iconName = 'person';
              return <Ionicons name={iconName} size={20} color={color} />;
            },
            tabBarShowIcon: true,
            tabBarActiveTintColor: '#007AFF',
            tabBarInactiveTintColor: 'gray',
            tabBarLabelStyle: { fontSize: 12 },
          })}
        >
          <Tab.Screen name="Головна" component={HomeScreen} />
          <Tab.Screen name="Фотогалерея" component={GalleryScreen} />
          <Tab.Screen name="Профіль" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
});