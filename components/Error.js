import React from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';

const Error = props => {
  // TODO: retry
  return (
    <View>
      <StatusBar backgroundColor="#ff6f00" />
      <Text style={styles.errorHeader}>ERROR</Text>
      <Text style={styles.errorContainer}>{props.error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    margin: 16,
  },
  errorHeader: {
    fontSize: 22,
    fontWeight: '600',
    margin: 16,
  },
});

export default Error;
