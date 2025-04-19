import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';

export default function DetailScreen({ route, navigation }) {
  const { task } = route.params || {};
  const [completed, setCompleted] = useState(task?.completed || false);

  if (!task) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ padding: 20 }}>Task details not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image 
            source={require('../assets/images/arrow.png')}
            style={styles.backImage}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Task Details</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* Task Info Card */}
      <View style={styles.card}>
        <Text style={styles.label}>Title:</Text>
        <Text style={styles.value}>{String(task.title)}</Text>

        <Text style={styles.label}>User ID:</Text>
        <Text style={styles.value}>{String(task.userId)}</Text>

        <Text style={styles.label}>Status:</Text>
        <Text style={[styles.value, { color: completed ? 'green' : 'red' }]}>
          {completed ? '✓ Completed' : '✗ Incomplete'}
        </Text>

        <TouchableOpacity
          style={[styles.toggleButton, { backgroundColor: completed ? 'red' : 'green' }]}
          onPress={() => setCompleted(!completed)}
        >
          <Text style={styles.buttonText}>Toggle Status</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'green',
    marginTop: 20,
  },
  backImage: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginTop: 4,
  },
  toggleButton: {
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
