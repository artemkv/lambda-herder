import React from 'react';
import {StyleSheet, SafeAreaView, Text, StatusBar} from 'react-native';
import theme from './theme';

const Error = props => {
  // TODO: retry
  return (
    <SafeAreaView style={styles.errorContainer}>
      <StatusBar backgroundColor="#ff6f00" />
      <Text style={styles.errorHeader}>ERROR</Text>
      <Text style={styles.errorTextContainer}>{props.error}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    backgroundColor: theme.color.background,
  },
  errorTextContainer: {
    margin: 16,
    color: theme.color.font,
  },
  errorHeader: {
    fontSize: 22,
    fontWeight: '600',
    margin: 16,
    color: theme.color.font,
  },
});

export default Error;
