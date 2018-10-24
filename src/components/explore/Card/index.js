import React, { PureComponent } from 'react';
import { withNavigation, NavigationActions } from 'react-navigation';
import { Dimensions, Image } from 'react-native';
import { View, Button, Text } from 'native-base';

import s from './styles';

export const WS = Dimensions.get('window');
export const sliderWidth = WS.width;
export const largeSlideWidth = WS.width - 40;
export const largeSlideHeight = largeSlideWidth / 2;


class Card extends PureComponent {
  capitalize = (string) => string && string.charAt(0).toUpperCase() + string.slice(1);
  nav = (id, routeName, params) => 
    this.props.navigation.navigate({
      routeName: id, 
      params, 
      action: NavigationActions.navigate({ routeName, params })
    });

  render() {
    const {
      name,
      gender,
      age,
      picture
    } = this.props.item;

    return (
      <Button
        transparent
        style={{ ...s.card, height: largeSlideHeight }}
        onPress={() => this.nav('Explore', 'ExploreAdvisorProfile', this.props.item)}>
        <Image style={s.avatar} source={{ uri: picture }} resizeMode="cover" />
        <View style={s.frontdrop}>
          {/* <Text style={s.ratio}>4/5</Text> */}
          <View style={s.content}>
            <Text style={s.name}>{name}</Text>
            <Text style={s.common}>{this.capitalize(gender)}{age && `, ${age}`}</Text>
          </View>
        </View>
      </Button>
    );
  }
}

export default withNavigation(Card);
