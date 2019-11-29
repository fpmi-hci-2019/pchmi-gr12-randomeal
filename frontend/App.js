import React from 'react';
import {
  createAppContainer, createBottomTabNavigator, createSwitchNavigator
} from "react-navigation";
import colors from './config/colors';

import FavouritesScreen from './components/screens/FavouritesScreen';
import MainScreen from './components/screens/MainScreen';
import UserSettingsScreen from './components/screens/UserSettingsScreen';
import LoginScreen from './components/screens/LoginScreen';

const MainTabs = createBottomTabNavigator(
  {
    Favourite: FavouritesScreen,
    Main: MainScreen,
    Settings: UserSettingsScreen
  },
  {
    initialRouteName : 'Main',
    tabBarOptions: {
      activeTintColor: colors.primaryColor
    }
  }
);

const MainNavigator = createSwitchNavigator({
  Start: LoginScreen,
  Main: MainTabs
});

const AppContainer = createAppContainer(MainNavigator);
export default AppContainer;
