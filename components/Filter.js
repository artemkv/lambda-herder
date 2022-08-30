import React from 'react';
import {StyleSheet, View, Text, StatusBar, SafeAreaView} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {useSelector, useDispatch} from 'react-redux';
import {updateFilterRegion} from '../state/actions';

const Filter = ({navigator, route}) => {
  const region = useSelector(state => state.filter.region);
  const regions = useSelector(state => state.filter.regions);

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
