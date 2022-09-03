import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {IconButton} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {initFilter, applyFilter} from '../state/actions';
import LambdaListContainer from './LambdaListContainer';
import LambdaDetailsContainer from './LambdaDetailsContainer';
import Filter from './Filter';

const MainScreen = () => {
  const Stack = createNativeStackNavigator();

  const currentRegionName = useSelector(state => state.settings.regionName);
  const currentOrder = useSelector(state => state.settings.order);
  const dispatch = useDispatch();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ffb300',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="LambdaList"
        component={LambdaListContainer}
        options={({navigation, route}) => ({
          title: `${currentRegionName}`,
          headerLeft: () => (
            <IconButton
              icon="menu"
              iconColor="#FFF"
              size={24}
              onPress={() => {
                navigation.toggleDrawer();
              }}
            />
          ),
          headerRight: () => (
            <IconButton
              icon="filter-outline"
              iconColor="#FFF"
              size={24}
              onPress={() => {
                let action = initFilter();
                dispatch(action);
                navigation.navigate('Filter', {});
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="LambdaDetails"
        component={LambdaDetailsContainer}
        options={{title: 'Details'}}
      />
      <Stack.Screen
        name="Filter"
        component={Filter}
        options={({navigation, route}) => ({
          title: 'Filter and sorting',
          headerRight: () => (
            <IconButton
              icon="check"
              iconColor="#FFF"
              size={24}
              onPress={() => {
                let action = applyFilter();
                dispatch(action);
                navigation.goBack();
              }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default MainScreen;
