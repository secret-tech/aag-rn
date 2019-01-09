import React, { PureComponent } from 'react';
import { withNavigation, NavigationActions } from 'react-navigation';
import { Dimensions, Image } from 'react-native';
import { View, Button, Text, Icon } from 'native-base';

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
      firstName,
      lastName,
      gender,
      age,
      picture,
      rating
    } = this.props.item;

    return (
      <Button
        transparent
        style={{ ...s.card, height: largeSlideHeight }}
        onPress={() => this.nav('Explore', 'ExploreAdvisorProfile', this.props.item)}>
        <Image style={s.avatar} source={{ uri: picture }} resizeMode="cover" />
        <View style={s.frontdrop}>
          {rating > 0
            ? (
              <View style={s.ratioWrap}>
                <Icon type="FontAwesome" name="star" style={{ fontSize: 16, color: '#e3b23c' }}/>
                <Text style={s.ratio}>{rating}</Text>
              </View>
            )
            : null}
          <View style={s.content}>
            <Text style={s.name}>{firstName}</Text>
            <Text style={s.common}>{this.capitalize(gender)}{age && `, ${age}`}</Text>
          </View>
        </View>
      </Button>
    );
  }
}

export default withNavigation(Card);
