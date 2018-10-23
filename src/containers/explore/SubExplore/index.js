import React, { Component } from 'react';
import { connect } from 'react-redux';

import SubExplorer from '../../../components/explore/SubExplorer';

const ADVISORS = [
  { name: 'name 1' },
  { name: 'name 2' },
  { name: 'name 3' },
  { name: 'name 4' }
];

class SubExplore extends Component {
  render() {
    const { type } = this.props.navigation.state.params;

    return (
      <SubExplorer advisors={ADVISORS} type={type}/>
    );
  }
}

export default connect(null, null)(SubExplore);
