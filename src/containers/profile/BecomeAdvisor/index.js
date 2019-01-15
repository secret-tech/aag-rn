import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Left, Button, Icon, Text, Body, Title, Right, View, Content } from 'native-base';

import s from './styles';

class BecomeAdvisor extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back'/>
              <Text>Back</Text>
            </Button>
          </Left>
          <Body>
            <Title>Become advisor</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <View style={s.wrapper}>
            <Text>Hey, wanna be an adviser? Good luck...</Text>
          </View>
        </Content>
      </Container>
    );
  }
}

export default connect()(BecomeAdvisor);