import React from 'react';
import {StyleSheet, SafeAreaView, Text, StatusBar} from 'react-native';
import theme from './theme';

const EmptyState = props => {
  // TODO: pull to refresh
  return (
    <SafeAreaView style={styles.emptyStateContainer}>
      <StatusBar backgroundColor="#ff6f00" />
      <Text style={styles.text}>Nothing found</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.color.background,
  },
  text: {
    color: theme.color.font,
  },
});

export default EmptyState;
