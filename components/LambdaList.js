import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  StatusBar,
} from 'react-native';
import Lambda from './Lambda';
import ErrorRatePieChart from './ErrorRatePieChart';
import SortingOrder from './SortingOrder';

const LambdaList = ({lambdas, navigation, refreshing, onRefresh}) => {
  return (
    <View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
  },
});

export default LambdaList;
