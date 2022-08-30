import React from 'react';
import {ActivityIndicator, StyleSheet, View, StatusBar} from 'react-native';

const Spinner = props => {
  return (
    <View style={styles.loadingIndicatorContainer}>
      <StatusBar backgroundColor="#ff6f00" />
      <ActivityIndicator size="large" color="#2d89ef" />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Spinner;
