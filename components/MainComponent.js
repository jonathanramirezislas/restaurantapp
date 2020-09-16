import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator  } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './HomeComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';

const MenuNavigator = createStackNavigator();

function MenuNavigatorScreen() {
    return(
        <MenuNavigator.Navigator
            initialRouteName='Menu' //This StackNavigator starts with menu as the first screen
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <MenuNavigator.Screen
                name="Menu"
                component={Menu}
            />
            <MenuNavigator.Screen
                name="Dishdetail"
                component={Dishdetail}
                options={{ headerTitle: "Dish Detail"}}
            />            
        </MenuNavigator.Navigator>
    );
}

const HomeNavigator = createStackNavigator();



function HomeNavigatorScreen() {
    return(
        <HomeNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                }
            }}
        >
            <HomeNavigator.Screen
                name="Home"
                component={Home}
            />
                      
        </HomeNavigator.Navigator>
    );
}

const Drawer = createDrawerNavigator();

function MainNavigatorScreen() {
    return(
        <Drawer.Navigator
        drawerStyle={{
            backgroundColor: '#C9DFE7',
            width: 240,
          }}
        initialRouteName="Home"
        >
            <Drawer.Screen
                name="Home"
                component={HomeNavigatorScreen}
                options={{ title: 'Home',drawerLabel:'Menu'  }}
            />
            <Drawer.Screen
                name="Menu"
                component={MenuNavigatorScreen}
                options={{ title: 'Menu', drawerLabel:'Menu' }}
            />
                      
        </Drawer.Navigator>
    );
}


class Main extends Component {

  render() {
 
    return (
        <NavigationContainer>
            <MainNavigatorScreen/>           
        </NavigationContainer>
    );
  }
}
  
export default Main;