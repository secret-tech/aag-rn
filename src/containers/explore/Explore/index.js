import React, { Component } from 'react';
import { connect } from 'react-redux';

import withBack from '../../../hoc/AnroidBackHandler';
import Explorer from '../../../components/explore/Explorer';
import Spinner from '../../../components/common/Spinner';

import { fetchAdvisors } from '../../../redux/ducks/explore/explore';


class Explore extends Component {
  componentWillMount() {
    this.props.fetchAdvisors();
  }

  render() {
    const { data, loading } = this.props.explore.toJS();

    return loading
      ? <Spinner/>
      : <Explorer data={data}/>;
  }
}

const ComponentWithBack = withBack(Explore);

export default connect(
  (state) => ({
    explore: state.explore.explore
  }), 
  {
    fetchAdvisors
  })(ComponentWithBack);
