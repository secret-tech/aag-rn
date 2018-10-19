import React, { Component } from 'react';
import { withNavigation, NavigationActions } from 'react-navigation';
import { Dimensions, Image } from 'react-native';
import { View, Button, Text } from 'native-base';

import s from './styles';

export const WS = Dimensions.get('window');
export const sliderWidth = WS.width;
export const largeSlideWidth = WS.width - 60;
export const largeSlideHeight = largeSlideWidth / 2;


class Card extends Component {
  nav = (id, routeName) => this.props.navigation.navigate(id, {}, NavigationActions.navigate({ routeName }));

  render() {
    console.log(this.props);
    return (
      <Button transparent style={s.card} onPress={() => this.nav('Explore', 'ExploreAdvisorProfile')}>
        <Image style={s.avatar} source={{ uri: 'https://images.pexels.com/photos/1492156/pexels-photo-1492156.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }} resizeMode="cover" />
        <View style={s.frontdrop}>
          <Text style={s.ratio}>4/5</Text>
          <View style={s.content}>
            <Text style={s.name}>Lauren Mayberry</Text>
            <Text style={s.common}>Female, 25</Text>
          </View>
        </View>
      </Button>
    );
  }
}

export default withNavigation(Card);
