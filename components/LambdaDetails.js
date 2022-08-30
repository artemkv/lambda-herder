import React from 'react';
import {ScrollView, View, Text, StyleSheet, RefreshControl} from 'react-native';
import Trends from './Trends';
import {
  VictoryLine,
  VictoryChart,
  VictoryGroup,
  VictoryTheme,
} from 'victory-native';

const LambdaDetails = ({data, log, refreshing, onRefresh}) => {
  const data1 = data.metrics.inv.map((v, idx) => ({idx, v}));
  const data2 = data.metrics.dur.map((v, idx) => ({idx, v}));
  const data3 = data.metrics.err.map((v, idx) => ({idx, v}));
  const data4 = data.metrics.thr.map((v, idx) => ({idx, v}));
  const data5 = data.metrics.cnc.map((v, idx) => ({idx, v}));

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Text style={styles.lambdaHeader}>{data.name}</Text>
      <Trends data={data} />
      <View style={styles.divider} />
      <Text style={styles.chartTitle}>Invocations</Text>
      <VictoryChart height={200} width={350} theme={VictoryTheme.material}>
        <VictoryGroup color="#2d89ef">
          <VictoryLine data={data1} x="idx" y="v" />
        </VictoryGroup>
      </VictoryChart>
      <Text style={styles.chartTitle}>Duration</Text>
      <VictoryChart height={200} width={350} theme={VictoryTheme.material}>
        <VictoryGroup color="#2d89ef">
          <VictoryLine data={data2} x="idx" y="v" />
        </VictoryGroup>
      </VictoryChart>
      <Text style={styles.chartTitle}>Errors</Text>
      <VictoryChart height={200} width={350} theme={VictoryTheme.material}>
        <VictoryGroup color="#2d89ef">
          <VictoryLine data={data3} x="idx" y="v" />
        </VictoryGroup>
      </VictoryChart>
      <Text style={styles.chartTitle}>Throttles</Text>
      <VictoryChart height={200} width={350} theme={VictoryTheme.material}>
        <VictoryGroup color="#2d89ef">
          <VictoryLine data={data4} x="idx" y="v" />
        </VictoryGroup>
      </VictoryChart>
      <Text style={styles.chartTitle}>Concurrent executions</Text>
      <VictoryChart height={200} width={350} theme={VictoryTheme.material}>
        <VictoryGroup color="#2d89ef">
          <VictoryLine data={data5} x="idx" y="v" />
        </VictoryGroup>
      </VictoryChart>
      <View style={styles.divider} />
      <View style={styles.logContainer}>
        {log.map((x, idx) => {
          const style = getLogLineStyle(x);
          return (
            <Text key={idx} style={style}>
              {x}
            </Text>
          );
        })}
      </View>
    </ScrollView>
  );
};

const getLogLineStyle = s => {
  if (s.includes('error') || s.includes('ERROR')) {
    return styles.logLineError;
  }
  return styles.logLineNeutral;
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
  logContainer: {
    marginTop: 16,
  },
  chartTitle: {
    marginTop: 8,
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
  },
  divider: {
    marginTop: 16,
    borderBottomColor: 'silver',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  logLineNeutral: {},
  logLineError: {
    color: '#e92967',
  },
});

export default LambdaDetails;
