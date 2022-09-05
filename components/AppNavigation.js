import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SettingsScreen from './SettingsScreen';
import MainScreen from './MainScreen';
import theme from './theme';

const AppNavigation = () => {
  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          drawerStyle: {
            backgroundColor: theme.color.background,
            width: 240,
          },
        }}>
        <Drawer.Screen
          name="Lambdas"
          component={MainScreen}
          options={{headerShown: false}}
        />
        <Drawer.Screen
          name="Settings"
          component={SettingsScreen}
          options={{headerShown: false}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
