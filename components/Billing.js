import React from 'react';
import {from} from 'datashaper-js';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryPie,
  VictoryGroup,
  VictoryAxis,
  VictoryTheme,
} from 'victory-native';
import theme from './theme';
import ServiceCost from './ServiceCost';

const Billing = ({billingData, refreshing, onRefresh}) => {
  const unit = billingData.unit;
  const total = billingData.total;
  const costByPeriod = billingData.costByPeriod;
  const costByService = billingData.costByService;
  const costByPeriodByService = billingData.costByPeriodByService;

  const sum = aa => aa.reduce((acc, cur) => acc + cur, 0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Text style={styles.chartTitle}>All your services</Text>
        <Text style={styles.chartSubTitle}>{`Total: ${unit} ${total.toFixed(
          2,
        )}`}</Text>
        <View style={styles.chartContainer}>
          <VictoryChart
            height={250}
            theme={VictoryTheme.material}
            domainPadding={{x: 4}}>
            <VictoryAxis
              style={{
                axis: {stroke: 'none'},
                grid: {stroke: 'none'},
                ticks: {stroke: 'none'},
              }}
            />
            <VictoryAxis
              dependentAxis
              style={{
                axis: {stroke: 'none'},
                ticks: {stroke: 'none'},
                tickLabels: {fill: 'none'},
              }}
            />
            <VictoryGroup color={theme.color.chartline}>
              <VictoryBar
                data={costByPeriod}
                alignment="middle"
                labels={({datum}) => `${datum.y.toFixed(2)}`}
              />
            </VictoryGroup>
          </VictoryChart>
        </View>

        <Text style={styles.chartTitle}>Cost distribution</Text>
        <View style={styles.chartContainer}>
          <VictoryChart
            height={250}
            theme={VictoryTheme.material}
            domainPadding={{x: 4}}>
            <VictoryAxis
              style={{
                axis: {stroke: 'none'},
                grid: {stroke: 'none'},
                ticks: {stroke: 'none'},
                tickLabels: {fill: 'none'},
              }}
            />
            <VictoryAxis
              dependentAxis
              style={{
                axis: {stroke: 'none'},
                grid: {stroke: 'none'},
                ticks: {stroke: 'none'},
                tickLabels: {fill: 'none'},
              }}
            />
            <VictoryPie
              data={costByService}
              colorScale={[
                theme.color.chart_blue,
                theme.color.chart_orange,
                theme.color.chart_cyan,
                theme.color.chart_purple,
                theme.color.chart_green,
                theme.color.chart_brown,
                theme.color.chart_pink,
                theme.color.chart_teal,
                theme.color.chart_deep_purple,
                theme.color.chart_light_green,
              ]}
              height={220}
            />
          </VictoryChart>
        </View>

        {'AWS Lambda' in costByPeriodByService ? (
          <ServiceCost
            serviceName="AWS Lambda"
            total={sum(costByPeriodByService['AWS Lambda'].map(x => x.y))}
            unit="USD"
            costByPeriod={costByPeriodByService['AWS Lambda']}
          />
        ) : (
          ''
        )}

        {from(costByPeriodByService)
          .listKeys()
          .filter(k => k !== 'AWS Lambda')
          .map(k => ({
            k: k,
            t: sum(costByPeriodByService[k].map(x => x.y)),
          }))
          .sorted((a, b) => b.t - a.t)
          .filter(x => x.t > 0)
          .map(({k, t}) => (
            <ServiceCost
              serviceName={k}
              total={t}
              unit="USD"
              costByPeriod={costByPeriodByService[k]}
            />
          ))
          .return()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.color.background,
  },
  chartContainer: {
    alignItems: 'center',
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
  scrollView: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  text: {
    fontSize: 22,
    color: theme.color.font,
  },
});

export default Billing;
