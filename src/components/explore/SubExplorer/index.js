import React, { Component } from 'react';
import { FlatList, View } from 'react-native';

import Card from '../Card';


class SubExplorer extends Component {
  _keyExtractor = (advisor) => advisor.id.toString();

  _renderItem = (advisor) => (
    <View style={{ paddingTop: 10, paddingLeft: 20, paddingRight: 20 }}>
      <Card {...advisor}/>
    </View>
  )

  render() {
    return (
      <FlatList
        data={this.props.data}
        initialNumToRender={5}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        onEndReached={this.props.fetchMoreAdvisors}
        onEndThreshold={0}/>
    );
  }
}

export default SubExplorer;