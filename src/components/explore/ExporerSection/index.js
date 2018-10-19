import React, { Component } from 'react';
import { Text, View } from 'native-base';
import Carousel from 'react-native-snap-carousel';

import Card, { sliderWidth, largeSlideWidth } from '../Card';

class ExplorerSection extends Component {
  render() {
    return (
      <View>
        <Text>{this.props.title}</Text>

        <Carousel
          ref={(c) => { this._carousel = c; }}
          data={this.props.advisors}
          renderItem={(props) => <Card {...props}/>}
          sliderWidth={sliderWidth}
          itemWidth={largeSlideWidth}/>
      </View>
    );
  }
}

export default ExplorerSection;
