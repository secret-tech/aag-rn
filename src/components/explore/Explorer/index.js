import React, { Component } from 'react';
import { Container, Content } from 'native-base';

import ExplorerSection from '../ExporerSection';


class Explorer extends Component {
  renderSection = (type) => {
    const filteredData = this.props.data.filter((item) => item.type === type)[0];
    return <ExplorerSection title={`${type} advisors`} data={filteredData}/>;
  }

  render() {
    return (
      <Container>
        <Content>
          {this.renderSection('featured')}
          {this.renderSection('new')}
          {this.renderSection('online')}
        </Content>
      </Container>
    );
  }
}

export default Explorer;