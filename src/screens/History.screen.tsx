import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppContext } from '../App.provider';

export const History: React.FC = () => {
  const appContext = useAppContext();
  return (
    <View style={styles.container}>
      <Text>{appContext.greeting}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
