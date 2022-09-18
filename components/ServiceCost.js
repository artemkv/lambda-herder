import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryAxis,
  VictoryTheme,
} from 'victory-native';
import theme from './theme';

const ServiceCost = props => {
  const serviceName = props.serviceName;
  const unit = props.unit;
  const total = props.total;
  const costByPeriod = props.costByPeriod;

  return (
    <View>
      <Text style={styles.chartTitle}>{serviceName}</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default ServiceCost;
