import React from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';

const EmptyState = props => {
  // TODO: pull to refresh
  return (
    <View style={styles.emptyStateContainer}>
      <StatusBar backgroundColor="#ff6f00" />
      <Text>Nothing found</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EmptyState;
