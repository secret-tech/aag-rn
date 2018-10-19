import React, { Component } from 'react';
import { Container, Content } from 'native-base';

import ExplorerSection from '../ExporerSection';


class Explorer extends Component {
  render() {
    return (
      <Container>
        <Content>
          <ExplorerSection title="Featured" advisors={[{}, {}, {}]}/>
          <ExplorerSection title="New" advisors={[{}, {}, {}]}/>
          <ExplorerSection title="Cool" advisors={[{}, {}, {}]}/>
        </Content>
      </Container>
    );
  }
}

export default Explorer;