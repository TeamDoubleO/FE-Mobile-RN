import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AppNavigator = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, KeyWe!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3498db',
  },
});

export default AppNavigator;
