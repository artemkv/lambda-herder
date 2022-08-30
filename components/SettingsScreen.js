import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {IconButton} from 'react-native-paper';
import Settings from './Settings';

const SettingsScreen = () => {
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
        name="AppSettings"
        component={Settings}
        options={({navigation, route}) => ({
          title: 'Settings',
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

export default SettingsScreen;
