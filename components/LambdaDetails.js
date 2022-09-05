import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import Trends from './Trends';
import {
  VictoryLine,
  VictoryChart,
  VictoryGroup,
  VictoryTheme,
} from 'victory-native';
import theme from './theme';

const LambdaDetails = ({data, log, refreshing, onRefresh}) => {
  const data1 = data.metrics.inv.map((v, idx) => ({idx, v}));
  const data2 = data.metrics.dur.map((v, idx) => ({idx, v}));
  const data3 = data.metrics.err.map((v, idx) => ({idx, v}));
  const data4 = data.metrics.thr.map((v, idx) => ({idx, v}));
  const data5 = data.metrics.cnc.map((v, idx) => ({idx, v}));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Text style={styles.lambdaHeader}>{data.name}</Text>
        <Trends data={data} />
        <View style={styles.divider} />
        <Text style={styles.chartsHeader}>Last 24 hours</Text>
        <Text style={styles.chartTitle}>Invocations</Text>
        <Text
          style={styles.chartSubTitle}>{`Total: ${data.aggregates.inv}`}</Text>
        <View style={styles.chartContainer}>
          <VictoryChart height={250} theme={VictoryTheme.material}>
            <VictoryGroup color={theme.color.chartline}>
              <VictoryLine data={data1} x="idx" y="v" />
            </VictoryGroup>
          </VictoryChart>
        </View>
        <Text style={styles.chartTitle}>Duration</Text>
        <Text style={styles.chartSubTitle}>{`Avg: ${data.aggregates.dur.toFixed(
          2,
        )} ms`}</Text>
        <View style={styles.chartContainer}>
          <VictoryChart height={250} theme={VictoryTheme.material}>
            <VictoryGroup color={theme.color.chartline}>
              <VictoryLine data={data2} x="idx" y="v" />
            </VictoryGroup>
          </VictoryChart>
        </View>
        <Text style={styles.chartTitle}>Errors</Text>
        <Text
          style={styles.chartSubTitle}>{`Total: ${data.aggregates.err}`}</Text>
        <View style={styles.chartContainer}>
          <VictoryChart height={250} theme={VictoryTheme.material}>
            <VictoryGroup color={theme.color.chartline}>
              <VictoryLine data={data3} x="idx" y="v" />
            </VictoryGroup>
          </VictoryChart>
        </View>
        <Text style={styles.chartTitle}>Throttles</Text>
        <Text
          style={styles.chartSubTitle}>{`Total: ${data.aggregates.thr}`}</Text>
        <View style={styles.chartContainer}>
          <VictoryChart height={250} theme={VictoryTheme.material}>
            <VictoryGroup color={theme.color.chartline}>
              <VictoryLine data={data4} x="idx" y="v" />
            </VictoryGroup>
          </VictoryChart>
        </View>
        <Text style={styles.chartTitle}>Concurrent executions</Text>
        <Text style={styles.chartSubTitle}>{`Avg: ${data.aggregates.cnc.toFixed(
          2,
        )}`}</Text>
        <View style={styles.chartContainer}>
          <VictoryChart height={250} theme={VictoryTheme.material}>
            <VictoryGroup color={theme.color.chartline}>
              <VictoryLine data={data5} x="idx" y="v" />
            </VictoryGroup>
          </VictoryChart>
        </View>
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
    </SafeAreaView>
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
    backgroundColor: theme.color.background,
  },
  scrollView: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  chartContainer: {
    alignItems: 'center',
  },
  lambdaHeader: {
    fontSize: 22,
    fontWeight: '600',
    color: theme.color.font,
  },
  logContainer: {
    marginTop: 16,
  },
  chartsHeader: {
    marginTop: 8,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
    color: theme.color.font,
  },
  chartTitle: {
    marginTop: 8,
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    color: theme.color.font,
  },
  chartSubTitle: {
    marginTop: 8,
    fontSize: 16,
    textAlign: 'center',
    color: theme.color.font,
  },
  divider: {
    marginTop: 16,
    borderBottomColor: 'silver',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  logLineNeutral: {
    color: theme.color.font,
  },
  logLineError: {
    color: theme.color.red,
  },
});

export default LambdaDetails;
