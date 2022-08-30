import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {getTrend} from '../business';

const Trends = ({data}) => {
  return (
    <View style={styles.trends}>
      <Text style={styles.trend}>
        <Text style={styles.metric}>INV: </Text>
        {getTrendColored(getTrend(data.metrics.inv).toFixed(2))}
      </Text>
      <Text style={styles.trend}>
        <Text style={styles.metric}>DUR: </Text>
        {getTrendColored(getTrend(data.metrics.dur).toFixed(2), true)}
      </Text>
      <Text style={styles.trend}>
        <Text style={styles.metric}>ERR: </Text>
        {getTrendColored(getTrend(data.metrics.err).toFixed(2), true)}
      </Text>
      <Text style={styles.trend}>
        <Text style={styles.metric}>THR: </Text>
        {getTrendColored(getTrend(data.metrics.thr).toFixed(2), true)}
      </Text>
      <Text style={styles.trend}>
        <Text style={styles.metric}>CNC: </Text>
        {getTrendColored(getTrend(data.metrics.cnc).toFixed(2), true)}
      </Text>
    </View>
  );
};

const getTrendColored = (val, reverse) => {
  let trendValue = '';
  if (val < 0) {
    trendValue = `↓${Math.abs(val)}%`;
  } else if (val > 0) {
    trendValue = `↑${val}%`;
  } else {
    trendValue = `${val}%`;
  }

  if (reverse ? val < 0 : val > 0) {
    return <Text style={styles.good}>{trendValue}</Text>;
  }
  if (reverse ? val > 0 : val < 0) {
    return <Text style={styles.bad}>{trendValue}</Text>;
  }

  return <Text style={styles.neutral}>{trendValue}</Text>;
};

const styles = StyleSheet.create({
  trends: {
    marginTop: 4,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  trend: {
    marginRight: 4,
    fontSize: 14,
  },
  metric: {
    fontWeight: '600',
  },
  good: {
    color: '#12a66d',
  },
  bad: {
    color: '#e92967',
  },
  neutral: {
    color: 'silver',
  },
});

export default Trends;
