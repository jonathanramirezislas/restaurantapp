import React, { Component,ReactElement } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator  } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItems,DrawerItemsList , SafeAreaView } from '@react-navigation/drawer';
import { Icon } from 'react-native-elements';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import {  StyleSheet } from 'react-native';
const mapStateToProps = state => {
return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
}
}
  
const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
})
  


import Home from './HomeComponent';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';


const StackNavigator = createStackNavigator();



function MenuNavigatorScreen({ navigation }) {
    return(
        <StackNavigator.Navigator
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
            <StackNavigator.Screen
                name="Menu"
                component={Menu}
                options={{ headerTitle: "Menu",
                headerLeft:() => ( <Icon name="menu" size={24} 
                        color= 'white'
                        onPress={ () => navigation.toggleDrawer() } />)
            
            
            }}

            />
            <StackNavigator.Screen
                name="Dishdetail"
                component={Dishdetail}
                options={{ headerTitle: "Dish Detail",
                
            }}
            />            
        </StackNavigator.Navigator>
    );
}

function HomeNavigatorScreen({ navigation }) {
    return(
        <StackNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                },
                headerLeft:() => ( <Icon name="menu" size={24} 
                        color= 'white'
                        onPress={ () => navigation.toggleDrawer() } />),
            }}
        >
            <StackNavigator.Screen
                name="Home"
                component={Home}
               
            />          
        </StackNavigator.Navigator>
    );
}

function AboutNavigatorScreen({ navigation }) {
    return(
        <StackNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                },
                headerLeft:() => ( <Icon name="menu" size={24} 
                        color= 'white'
                        onPress={ () => navigation.toggleDrawer() } />),
            }}
        >
            <StackNavigator.Screen
                name="About"
                component={About}
            />          
        </StackNavigator.Navigator>
    );
}




function ContactNavigatorScreen({ navigation }) {
    return(
        <StackNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#512DA8"
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    color: "#fff"            
                },
                headerLeft:() => ( <Icon name="menu" size={24} 
                        color= 'white'
                        onPress={ () => navigation.toggleDrawer() } />),
            }}
        >
            <StackNavigator.Screen
                name="Contact"
                component={Contact}
            />          
        </StackNavigator.Navigator>
    );
}






const Drawer = createDrawerNavigator();

function MainNavigatorScreen() {
    return(
        <Drawer.Navigator
        initialRouteName="Home"
        drawerStyle={{
            backgroundColor: '#C9DFE7',
            width: 240,

          }}
        >
            <Drawer.Screen
                name="Home"
                component={HomeNavigatorScreen}
                options={{ headerTitle: 'Home', drawerLabel:'Home',
                drawerIcon: ({focused}) => (
                    <Icon
                    name='home'
                    type='font-awesome'            
                    size={22}
                      color={focused ? '#7cc' : '#ccc'}
                    />
                  ), }}

                />
            <Drawer.Screen
                name="Menu"
                component={MenuNavigatorScreen}
                options={{ headerTitle: 'Menu', drawerLabel:'Menu',
                drawerIcon: ({focused}) => (
                    <MaterialCommunityIcons name="menu" color={focused ? "#7cc" : "#ccc"} size={25} />

                  )
                }}
    
            />

            <Drawer.Screen
                name="Contact"
                component={ContactNavigatorScreen}

                options={{ headerTitle: 'Contact', drawerLabel:'Contact',
                drawerIcon: ({focused}) => (
                    <Icon
                    name='address-card'
                    type='font-awesome'            
                    size={22}
                      color={focused ? '#7cc' : '#ccc'}
                    />
                  ), }}
                
            />
            <Drawer.Screen
                name="About"
                component={AboutNavigatorScreen}
                options={{ headerTitle: 'About', drawerLabel:'About',
                drawerIcon: ({focused}) => (
                    <Icon
                    name='info-circle'
                    type='font-awesome'            
                    size={22}
                      color={focused ? '#7cc' : '#ccc'}
                    />
                  ), }}
            />
           
                      
        </Drawer.Navigator>
    );
}


class Main extends Component {
    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
      }
   
  render() {
    return (
        <NavigationContainer>
            <MainNavigatorScreen/>           
        </NavigationContainer>
    );
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Main);

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerHeader: {
      backgroundColor: '#512DA8',
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row'
    },
    drawerHeaderText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold'
    },
    drawerImage: {
      margin: 10,
      width: 80,
      height: 60
    }
  });
  