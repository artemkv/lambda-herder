import React from 'react';
import {StyleSheet, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {updateSortingOrderIndex} from '../state/actions';
import {useSelector, useDispatch} from 'react-redux';
import {saveSelectedOrder} from '../persistence';
import {getOrderOptionIndex, getOrderOptions} from '../awslambdaordering';
import {reportPickSortingOrder} from '../journeyconnector';

const SortingOrder = props => {
  const order = useSelector(state => state.settings.order);
  const orderOptions = getOrderOptions();
  const dispatch = useDispatch();

  const orderIndex = getOrderOptionIndex(order);

  return (
    <View style={styles.inputContainer}>
      <SelectDropdown
        defaultValueByIndex={orderIndex}
        buttonStyle={styles.dropdownBtnStyle}
        buttonTextStyle={styles.dropdownBtnTxtStyle}
        dropdownStyle={styles.dropdownDropdownStyle}
        rowStyle={styles.dropdownRowStyle}
        rowTextStyle={styles.dropdownRowTxtStyle}
        data={orderOptions}
        onSelect={(selectedItem, index) => {
          let action = updateSortingOrderIndex(index);
          dispatch(action);
          saveSelectedOrder(selectedItem.order);
          reportPickSortingOrder(selectedItem.order);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return `Order by: ${selectedItem.name}`;
        }}
        rowTextForSelection={(item, index) => {
          return `${item.name}`;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
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

export default SortingOrder;
