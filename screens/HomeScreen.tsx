import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, SafeAreaView, TouchableOpacity, Button } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskItem from './TaskItem';

export default function HomeScreen({ navigation }) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [error, setError] = useState(false);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const res = await fetch('https://jsonplaceholder.typicode.com/todos');
            const data = await res.json();
            setTasks(data);
            await AsyncStorage.setItem('tasks', JSON.stringify(data));
            setError(false);
        } catch (err) {
            const cachedTasks = await AsyncStorage.getItem('tasks');
            if (cachedTasks) {
                setTasks(JSON.parse(cachedTasks));
            } else {
                setError(true);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const getFilteredTasks = () => {
        if (filter === 'Completed') return tasks.filter(task => task.completed);
        if (filter === 'Incomplete') return tasks.filter(task => !task.completed);
        return tasks;
    };

    if (loading) return <ActivityIndicator size="large" style={styles.centered} />;
    if (error) return (
        <View style={styles.centered}>
            <Text>Error fetching tasks.</Text>
            <Button title="Retry" onPress={fetchTasks} />
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Custom Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Task Manager</Text>
            </View>

            {/* Filter Buttons */}
            <View style={styles.filterContainer}>
    {/* 'All' Filter Button */}
    <TouchableOpacity
        style={[styles.filterButton, {
            backgroundColor: '#3498db',
            opacity: filter === 'All' ? 1 : 0.5
        }]}
        onPress={() => setFilter('All')}
    >
        <Text style={styles.filterText}>All</Text>
    </TouchableOpacity>

    {/* 'Completed' Filter Button */}
    <TouchableOpacity
        style={[styles.filterButton, {
            backgroundColor: 'green',
            opacity: filter === 'Completed' ? 1 : 0.5
        }]}
        onPress={() => setFilter('Completed')}
    >
        <Text style={styles.filterText}>Completed</Text>
    </TouchableOpacity>

    {/* 'Incomplete' Filter Button */}
    <TouchableOpacity
        style={[styles.filterButton, {
            backgroundColor: 'red',
            opacity: filter === 'Incomplete' ? 1 : 0.5
        }]}
        onPress={() => setFilter('Incomplete')}
    >
        <Text style={styles.filterText}>Incomplete</Text>
    </TouchableOpacity>
</View>

            {/* Task List */}
            <FlatList
                data={getFilteredTasks()}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.taskCard}
                      onPress={() => navigation.navigate('Detail', { task: item })}
                    >
                      <Text style={styles.taskTitle}>{item.title}</Text>
                      <Text style={styles.taskStatus}>
                        {item.completed ? '✅ Completed' : '❌ Incomplete'}
                      </Text>
                    </TouchableOpacity>
                  )}
                  

            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, },
    header: {
        paddingVertical: 15,
        backgroundColor: 'green',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 5,


    },
    taskCard: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        marginHorizontal: 16,
        marginVertical: 4,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
      },
      taskTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
      },
      taskStatus: {
        fontSize: 14,
        color: '#666',
      },
      
      filterButton: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginHorizontal: 5,
        
    },
    filterSelected: {
        opacity: 1,
        backgroundColor: 'green',
    },
    filterUnselected: {
        opacity: 0.5,
        backgroundColor: 'gray',
    },
    
    headerTitle: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    filterText:{
      color:'white',
      fontWeight:'bold'
    },
    filterContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, marginBottom: 10 },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 50, borderWidth: 1 },
});
