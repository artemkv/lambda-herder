import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {VictoryPie} from 'victory-native';
import theme from './theme';

const ErrorRatePieChart = props => {
  const calculated = props.data
    .map(x => ({
      inv: sum(x.metrics.inv),
      err: sum(x.metrics.err),
    }))
    .reduce(
      (acc, cur) => ({
        inv: acc.inv + cur.inv,
        err: acc.err + cur.err,
      }),
      {inv: 0, err: 0},
    );

  const data = [
    {x: `Errors (${calculated.err})`, y: calculated.err},
    {
      x: `Successes (${calculated.inv - calculated.err})`,
      y: calculated.inv - calculated.err,
    },
  ];

  const rate = `Total Error Rate: ${(
    (calculated.err / calculated.inv) *
    100
  ).toFixed(2)}%`;

  return (
    <View>
      <Text style={styles.rate}>{rate}</Text>
      <VictoryPie
        colorScale={[theme.color.red, theme.color.green]}
        data={data}
        height={220}
        innerRadius={45}
      />
    </View>
  );
};

const sum = aa => {
  return aa.reduce((acc, cur) => acc + cur, 0);
};

const styles = StyleSheet.create({
  rate: {
    margin: 16,
    fontSize: 16,
    textAlign: 'center',
    color: theme.color.font,
  },
});

export default ErrorRatePieChart;
