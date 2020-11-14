import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
      dishes: state.dishes
    }
  }

class Menu extends Component {
  
    static navigayionOptions={
        title: 'Menu', // in the status bar  when my menu componnet is display the title that will be shown  in the status bar would be Menu
        
    }

  

    //FlatList component create a list of items(ListItem component)
    render() {
        //Arrow function that receves two params
        //Index will use for key for each ListItem
        const renderMenuItem = ({item, index}) => {

            return (
                
                    <Tile
                        key={index}
                        title={item.name}
                        caption={item.description}
                        featured
                        onPress={() => navigate('Dishdetail', { dishId: item.id })}
                        imageSrc={{ uri: baseUrl + item.image}}
                    />
            );
        };

        //we extrat the navigation from props in order to use to pass data to dishditail component
        const { navigate } = this.props.navigation;

       

        return (
            <FlatList 
                data={this.props.dishes.dishes}
                renderItem={renderMenuItem} 
                keyExtractor={item => item.id.toString()}
                />
    );
    }
  
}


export default connect(mapStateToProps)(Menu);