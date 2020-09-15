import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { DISHES } from '../shared/dishes';

class Menu extends Component {
    constructor(props){
        super(props);
        this.state={
            dishes:DISHES
        }
    }

    static navigayionOptions={
        title: 'Menu' // in the status bar  when my menu componnet is display the title that will be shown  in the status bar would be Menu
    }

  

    //FlatList component create a list of items(ListItem component)
    render() {
        //Arrow function that receves two params
        //Index will use for key for each ListItem
        const renderMenuItem = ({item, index}) => {

            return (
                
                    <ListItem
                        key={index}
                        title={item.name}
                        subtitle={item.description}
                        hideChevron={true}
                        onPress={() => navigate('Dishdetail', { dishId: item.id })}
                        leftAvatar={{ source: require('./images/uthappizza.png')}}
                    />
            );
        };
        

        const { navigate } = this.props.navigation;

        return (
            <FlatList 
                data={this.state.dishes}
                renderItem={renderMenuItem} 
                keyExtractor={item => item.id.toString()}
                />
    );
    }
  
}


export default Menu;