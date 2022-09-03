import React from 'react';
import {StyleSheet, View, Text, StatusBar, SafeAreaView} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {useSelector, useDispatch} from 'react-redux';
import {updateFilterRegion, updateFilterOrder} from '../state/actions';
import {
  ORDER_BY_NAME,
  ORDER_BY_DATE,
  ORDER_BY_INVOCATIONS,
  ORDER_BY_DURATION,
  ORDER_BY_ERRORS,
  ORDER_BY_THROTTLING,
  ORDER_BY_CNCS,
} from '../state/constants';

const orderOptions = [
  {name: 'Function name', order: ORDER_BY_NAME},
  {name: 'Date modified', order: ORDER_BY_DATE},
  {name: '# of invocations', order: ORDER_BY_INVOCATIONS},
  {name: 'Avg duration', order: ORDER_BY_DURATION},
  {name: '# of errors', order: ORDER_BY_ERRORS},
  {name: '# of throttles', order: ORDER_BY_THROTTLING},
  {name: 'Avg number of concurrent executions', order: ORDER_BY_CNCS},
];

const Filter = ({navigator, route}) => {
  const region = useSelector(state => state.filter.region);
  const regions = useSelector(state => state.filter.regions);
  const order = useSelector(state => state.filter.order);
  const selectedOrder = orderOptions.filter(x => x.order === order)[0];

  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#ff6f00" />
      <View style={styles.filterContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.filterLabel}>Region</Text>
        </View>
        <View style={styles.inputContainer}>
          <SelectDropdown
            defaultValue={region}
            defaultButtonText={'Select region'}
            buttonStyle={styles.dropdownBtnStyle}
            buttonTextStyle={styles.dropdownBtnTxtStyle}
            dropdownStyle={styles.dropdownDropdownStyle}
            rowStyle={styles.dropdownRowStyle}
            rowTextStyle={styles.dropdownRowTxtStyle}
            data={regions}
            onSelect={(selectedItem, index) => {
              let action = updateFilterRegion(selectedItem);
              dispatch(action);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return `${selectedItem.region} ${selectedItem.name}`;
            }}
            rowTextForSelection={(item, index) => {
              return `${item.region} ${item.name}`;
            }}
          />
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.filterLabel}>Order results by</Text>
        </View>
        <View style={styles.inputContainer}>
          <SelectDropdown
            defaultValue={selectedOrder}
            buttonStyle={styles.dropdownBtnStyle}
            buttonTextStyle={styles.dropdownBtnTxtStyle}
            dropdownStyle={styles.dropdownDropdownStyle}
            rowStyle={styles.dropdownRowStyle}
            rowTextStyle={styles.dropdownRowTxtStyle}
            data={orderOptions}
            onSelect={(selectedItem, index) => {
              let action = updateFilterOrder(selectedItem.order);
              dispatch(action);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              return `${selectedItem.name}`;
            }}
            rowTextForSelection={(item, index) => {
              return `${item.name}`;
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  filterContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  labelContainer: {
    //    backgroundColor: 'yellow',
  },
  filterLabel: {
    marginHorizontal: 8,
    paddingHorizontal: 8,
    marginVertical: 4,
    paddingVertical: 4,
    fontSize: 22,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    //    backgroundColor: 'blue',
  },
  dropdownBtnStyle: {
    marginHorizontal: 8,
    paddingHorizontal: 8,
    marginVertical: 4,
    paddingVertical: 4,
    height: 50,
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdownBtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdownDropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdownRowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdownRowTxtStyle: {color: '#444', textAlign: 'left'},
});

export default Filter;
