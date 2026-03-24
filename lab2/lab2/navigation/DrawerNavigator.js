import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from './StackNavigator';
import ContactsScreen from '../screens/ContactsScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={undefined}
      screenOptions={{
        drawerType: 'front',
        swipeEnabled: true,
      }}
    >
      <Drawer.Screen
        name="News"
        component={StackNavigator}
        options={{ headerShown: false, title: 'Новини' }}
      />
      <Drawer.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{ title: 'Контакти' }}
      />
    </Drawer.Navigator>
  );
}