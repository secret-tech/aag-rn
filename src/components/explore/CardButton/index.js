import React, { Component } from 'react';
import { withNavigation, NavigationActions } from 'react-navigation';
import { Dimensions, Image } from 'react-native';
import { View, Button, Text } from 'native-base';

import s from './styles';

export const WS = Dimensions.get('window');
export const sliderWidth = WS.width;
export const largeSlideWidth = WS.width - 40;
export const largeSlideHeight = largeSlideWidth / 2;


class CardButton extends Component {
  nav = (id, routeName, params) => 
    this.props.navigation.navigate({
      routeName: id, 
      params, 
      action: NavigationActions.navigate({ routeName, params })
    });

  render() {
    const { type } = this.props;

    return (
      <Button
        transparent
        style={{ ...s.card, height: largeSlideHeight }}
        onPress={() => this.nav('Explore', 'ExploreSubExplore', { type })}>
        <Text style={s.title}>More {type} advisors</Text>
      </Button>
    );
  }
}

export default withNavigation(CardButton);
