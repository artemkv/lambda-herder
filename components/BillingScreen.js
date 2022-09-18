import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {IconButton} from 'react-native-paper';
import BillingContainer from './BillingContainer';

const BillingScreen = () => {
  const Stack = createNativeStackNavigator();

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
        name="BillingScreen"
        component={BillingContainer}
        options={({navigation, route}) => ({
          title: 'Billing',
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
        })}
      />
    </Stack.Navigator>
  );
};

export default BillingScreen;
