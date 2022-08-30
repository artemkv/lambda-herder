import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {VictoryPie} from 'victory-native';

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
        colorScale={['#e92967', '#12a66d']}
        data={data}
        height={200}
        innerRadius={65}
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
  },
});

export default ErrorRatePieChart;
