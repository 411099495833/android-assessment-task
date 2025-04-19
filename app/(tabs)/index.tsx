import React from 'react';
import { StatusBar, View, StyleSheet } from 'react-native';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@/screens/HomeScreen';
import DetailScreen from '@/screens/DetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationIndependentTree>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="green" />

        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Detail" component={DetailScreen}
            options={{headerShown:false}}
              />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </NavigationIndependentTree>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green', // Ensures status bar blends in
  },
});
