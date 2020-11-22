import React, { Component } from 'react';
import { Text, View, Animated, Easing } from 'react-native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
  }

  function RenderItem(props) {
    const item = props.item;
  
    if (props.isLoading) {
      return <Loading />;
    } else if (props.errMess) {
      return (
        <View>
          <Text>{props.errMess}</Text>
        </View>
      );
    } else {
      if (item != null) {
        return (
          <Card
            featuredTitle={item.name}
            featuredSubtitle={item.designation}
            image={{ uri: baseUrl + item.image }}
          >
            <Text style={{ margin: 10 }}>{item.description}</Text>
          </Card>
        );
      } else {
        return <View />;
      }
    }
  }

class Home extends Component {
    constructor(props) {
        super(props);
        this.animatedValue=new Animated.Value(0);
      }
    static navigationOptions = {
        title: 'Home',
    };

    componentDidMount () {
      this.animate()
  }

  animate () {
      this.animatedValue.setValue(0);
      /*
      specify parameters  duration and mode of animation
      */
      Animated.timing(
        this.animatedValue,
        {
          toValue: 8,// from 0 to 8. NOTE this will be used in xpos1,xpos2,xpos3
          duration: 8000,//duration 8 seconds
          easing: Easing.linear, //way to change the value in this case linear
          useNativeDriver:true
        }
      ).start(() => this.animate());//start the animation
  }

  render() {
    //interpolate means map
    const xpos1 = this.animatedValue.interpolate({
        inputRange: [0, 1, 3, 5, 8],//ASC Values when x =0 then value of dregres will be 1200 and so on
        outputRange: [1200, 600, 0, -600, -1200] //axis x (pixels)
    })
    const xpos2 = this.animatedValue.interpolate({
        inputRange: [0, 2, 4, 6, 8],
        outputRange: [1200, 600, 0, -600, -1200]
    })
    const xpos3 = this.animatedValue.interpolate({
        inputRange: [0, 3, 5, 7, 8],
        outputRange: [1200, 600, 0, -600, -1200 ]
    })

    return(
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
        <Animated.View style={{ width: '100%', transform: [{translateX: xpos1}]}}>
            <RenderItem item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                isLoading={this.props.dishes.isLoading}
                erreMess={this.props.dishes.erreMess} 
                />
        </Animated.View>
        <Animated.View style={{ width: '100%',  transform: [{translateX: xpos2}]}}>
            <RenderItem item={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                isLoading={this.props.promotions.isLoading}
                erreMess={this.props.promotions.erreMess} 
                />
        </Animated.View>
        <Animated.View style={{ width: '100%',  transform: [{translateX: xpos3}]}}>
            <RenderItem item={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                isLoading={this.props.leaders.isLoading}
                erreMess={this.props.leaders.erreMess} 
                />
            </Animated.View>
        </View>
    );
 
    }
}

export default connect(mapStateToProps)(Home);