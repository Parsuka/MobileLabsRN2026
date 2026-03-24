import React from 'react';
import { View, Text, SectionList } from 'react-native';
import { contactsData } from '../data/contactsData';

export default function ContactsScreen() {
  return (
    <SectionList
      sections={contactsData}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => (
        <Text style={{ padding: 10 }}>{item}</Text>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={{ fontWeight: 'bold', backgroundColor: '#ddd', padding: 5 }}>
          {title}
        </Text>
      )}
      ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#ccc' }} />}
    />
  );
}