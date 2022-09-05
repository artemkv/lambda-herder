import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  RefreshControl,
  StatusBar,
} from 'react-native';
import Lambda from './Lambda';
import ErrorRatePieChart from './ErrorRatePieChart';
import SortingOrder from './SortingOrder';
import theme from './theme';

const LambdaList = ({lambdas, navigation, refreshing, onRefresh}) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#ff6f00" />
      <FlatList
        style={styles.container}
        data={lambdas}
        renderItem={({item}) => <Lambda data={item} navigation={navigation} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={() => {
          return (
            <View>
              <SortingOrder />
              <ErrorRatePieChart data={lambdas} />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.color.background,
  },
});

export default LambdaList;
