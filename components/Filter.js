import React, {useEffect} from 'react';
import {StyleSheet, View, Text, StatusBar, SafeAreaView} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {useSelector, useDispatch} from 'react-redux';
import {updateFilterRegionIndex} from '../state/actions';
import {saveSelectedRegion} from '../persistence';
import {reportChangeRegion, reportNavigateToFilter} from '../journeyconnector';
import theme from './theme';

const Filter = ({navigator, route}) => {
  const regionIndex = useSelector(state => state.filter.regionIndex);
  const regions = useSelector(state => state.filter.regions);

  useEffect(() => {
    reportNavigateToFilter();
  }, []);

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
            defaultValueByIndex={regionIndex}
            defaultButtonText={'Select region'}
            buttonStyle={styles.dropdownBtnStyle}
            buttonTextStyle={styles.dropdownBtnTxtStyle}
            dropdownStyle={styles.dropdownDropdownStyle}
            rowStyle={styles.dropdownRowStyle}
            rowTextStyle={styles.dropdownRowTxtStyle}
            data={regions}
            onSelect={(selectedItem, index) => {
              let action = updateFilterRegionIndex(index);
              dispatch(action);
              saveSelectedRegion(selectedItem.region);
              reportChangeRegion();
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
    backgroundColor: theme.color.background,
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
    color: theme.color.font,
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
