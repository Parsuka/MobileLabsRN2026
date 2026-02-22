import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function ProfileScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');

  const fields = [
    { label: 'Електронна пошта', value: email, setter: setEmail },
    { label: 'Пароль', value: password, setter: setPassword, secure: true },
    {
      label: 'Пароль (ще раз)',
      value: password2,
      setter: setPassword2,
      secure: true,
    },
    { label: 'Прізвище', value: lastName, setter: setLastName },
    { label: 'Імʼя', value: firstName, setter: setFirstName },
  ];

  return (
    <ScrollView>
      <Text style={styles.title}>Реєстрація</Text>
      {fields.map(({ label, value, setter, secure }) => (
        <View key={label} style={styles.inputGroup}>
          <Text>{label}</Text>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={setter}
            secureTextEntry={!!secure}
          />
        </View>
      ))}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Зареєструватися</Text>
      </TouchableOpacity>
      <Text style={styles.footer}>Ярошук Даниїл Володимирович, ІПЗ-24-5</Text>{' '}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', margin: 16 },
  inputGroup: { paddingHorizontal: 16, marginBottom: 12 },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 6,
  },
  button: {
    margin: 16,
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  footer: {
    textAlign: 'center',
    padding: 10,
    color: 'gray',
    fontStyle: 'italic',
  },
});
