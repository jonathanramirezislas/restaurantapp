import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';
import { View, Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null
    };
  }

  onDishSelect(dishId) {
    this.setState({selectedDish: dishId})
  }

  render() {
  
    return (
      //We pass dishes to Menu
      <View >
      {/* onPress we pass DIshId to the function onDishselect and this fucntion changes the state to selectDish  */} 
        <Menu dishes={this.state.dishes} onPress={(dishId) => this.onDishSelect(dishId)} />
        
        {/*
         Render the choosen dish  with selectedDish 
         filter return all the dishes that mathes the dish.id with selectedDish
        
         Note: If SelectDish is null Dishdatil component will return empty View (<View></View>)
        
        */} 
        <Dishdetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
      </View>
    );
  }
}
  
export default Main;