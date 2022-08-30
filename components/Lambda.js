import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Trends from './Trends';

const Lambda = props => {
  const data = props.data;
  const navigation = props.navigation;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('LambdaDetails', data)}>
        <View>
          <Text style={styles.lambdaHeader}>{data.name}</Text>
        </View>
        <Trends data={data} />
        <View style={styles.divider} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    marginTop: 4,
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  lambdaHeader: {
    fontSize: 22,
    fontWeight: '600',
  },
  divider: {
    marginTop: 16,
    borderBottomColor: 'silver',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default Lambda;
