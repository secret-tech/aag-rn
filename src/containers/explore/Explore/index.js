import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'native-base';

import Explorer from '../../../components/explore/Explorer';

import { fetchAdvisors } from '../../../redux/ducks/explore/explore';


class Explore extends Component {
  componentWillMount() {
    this.props.fetchAdvisors();
  }

  render() {
    const { data, loading } = this.props.explore.toJS();

    return loading
      ? <View><Text>Loading...</Text></View>
      : <Explorer data={data}/>;
  }
}


export default connect(
  (state) => ({
    explore: state.explore.explore
  }), 
  {
    fetchAdvisors
  })(Explore);
