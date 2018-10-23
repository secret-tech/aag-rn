import React, { Component } from 'react';
import { Container, Content, Text } from 'native-base';


class SubExplorer extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Text>{this.props.type} advisors</Text>
        </Content>
      </Container>
    );
  }
}

export default SubExplorer;