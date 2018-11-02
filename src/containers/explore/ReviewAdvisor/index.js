import React, { Component } from 'react';
import { View, Text } from 'native-base';


class ReviewAdvisor extends Component {
  render() {
    console.log('review component', this);
    
    return (
      <View>
        <Text>Review!</Text>
      </View>
    );
  }
}


export default ReviewAdvisor;
