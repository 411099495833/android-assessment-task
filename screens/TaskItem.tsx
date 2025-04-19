import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TaskItem({ task, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Text style={styles.title}>{task.title}</Text>
      <Text style={{ color: task.completed ? 'green' : 'red' }}>
        {task.completed ? '✓ Completed' : '✗ Incomplete'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
