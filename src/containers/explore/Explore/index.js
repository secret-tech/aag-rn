import React, { Component } from 'react';
import { connect } from 'react-redux';

import Explorer from '../../../components/explore/Explorer';

const DATA = [
  {
    type: 'new',
    advisors: [
      { name: 'name 1' },
      { name: 'name 2' },
      { name: 'name 3' },
      { name: 'name 4' }
    ]
  },
  {
    type: 'featured',
    advisors: [
      { name: 'name 1' },
      { name: 'name 2' },
      { name: 'name 3' },
      { name: 'name 4' }
    ]
  },
  {
    type: 'online',
    advisors: [
      { name: 'name 1' },
      { name: 'name 2' },
      { name: 'name 3' },
      { name: 'name 4' }
    ]
  }
];

class Explore extends Component {
  render() {
    return (
      <Explorer data={DATA}/>
    );
  }
}

export default connect(null, null)(Explore);
