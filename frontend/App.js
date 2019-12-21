import React from 'react';
import {
    createAppContainer, createBottomTabNavigator, createSwitchNavigator, createStackNavigator
} from "react-navigation";
import {Button} from 'react-native';
import colors from './config/colors';
import dimensions from './config/dimensions';

import FavouritesScreen from './components/screens/FavouritesScreen';
import MainScreen from './components/screens/MainScreen';
import UserSettingsScreen from './components/screens/UserSettingsScreen';
import LoginScreen from './components/screens/LoginScreen';
import BoardDetailsScreen from "./components/screens/BoardDetailsScreen";
import DishesScreen from "./components/screens/DishesScreen";
import DishDetailsScreen from "./components/screens/DishDetailsScreen";
import Ionicons from "react-native-vector-icons/Ionicons";

const DishesNavigator = createStackNavigator({
        Boards: {
            screen: MainScreen,
        },
        BoardInfo: BoardDetailsScreen,
        Dishes: DishesScreen,
        Recipe: DishDetailsScreen,
    }
);

const MainTabs = createBottomTabNavigator(
    {
        Favourite: FavouritesScreen,
        Main: {
            screen: DishesNavigator,
            navigationOptions: {
                tabBarIcon: ({focused, tintColor}) => (
                    <Ionicons
                        name={'ios-albums'}
                        size={dimensions.SMALL_ICON_SIZE}
                        color={tintColor}
                    />
                ),
            }
        },
        Settings: UserSettingsScreen
    },
    {
        initialRouteName: 'Main',
        tabBarOptions: {
            activeTintColor: colors.primaryColor,
            //activeBackgroundColor: colors.activeBackColor,
            //inactiveBackgroundColor: colors.white
        }
    }
);

const MainNavigator = createSwitchNavigator({
    Start: LoginScreen,
    Main: MainTabs
});

const AppContainer = createAppContainer(MainNavigator);
export default AppContainer;
