import React, { Component } from 'react';
import { Text, View } from 'native-base';
import Carousel from 'react-native-snap-carousel';

import Card, { sliderWidth, largeSlideWidth } from '../Card';
import CardButton from '../CardButton';

import s from './styles';

class ExplorerSection extends Component {
  capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  getItems = () => {
    const advisors = this.props.data.map((advisor) => ({ ...advisor, type: 'advisor' }));
    const button = { type: 'button', nav: this.props.type }
    const withButton = [...advisors, button];

    return withButton;
  }

  itemRenderer = (props) => {
    if (props.item.type === 'advisor') return <Card {...props}/>;
    if (props.item.type === 'button') return <CardButton type={props.item.nav}/>;

    console.warn('something went wrong with render ExplorerSection items');
    return null;
  }

  render() {
    return (
      <View style={s.section}>
        <Text style={s.title}>{this.props.title}</Text>

        <Carousel
          ref={(c) => { this._carousel = c; }}
          data={this.getItems()}
          renderItem={this.itemRenderer}
          sliderWidth={sliderWidth}
          itemWidth={largeSlideWidth}/>
      </View>
    );
  }
}

export default ExplorerSection;
