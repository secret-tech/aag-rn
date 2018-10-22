import React, { Component } from 'react';
import { Container, Header, Left, Button, Icon, Text, Body, Title, Right, View } from 'native-base';

class EditTags extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
              <Text>Back</Text>
            </Button>
          </Left>
          <Body>
            <Title>Edit interests</Title>
          </Body>
          <Right/>
        </Header>
        <View>
          <Text>sup</Text>
        </View>
      </Container>
    );
  }
}

export default EditTags;
