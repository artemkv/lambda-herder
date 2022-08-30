import React from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';

const Splash = props => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ff6f00" />
      <Text style={styles.text}>λ</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffb300',
  },
  text: {
    fontSize: 200,
    color: '#FFF',
    fontWeight: '600',
  },
});

export default Splash;
