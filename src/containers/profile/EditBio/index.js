import React, { Component } from 'react';
import { Container, Header, Left, Button, Icon, Text, Body, Title, Right, View, Content, Textarea } from 'native-base';

import s from './styles';

class EditBio extends Component {
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
            <Title>Edit bio</Title>
          </Body>
          <Right>
            <Button transparent>
              <Text>Save</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <View style={s.wrapper}>
            <Textarea
              rowSpan={10}
              bordered
              style={s.textarea}
              placeholder="Few words about you..."/>
          </View>
        </Content>
      </Container>
    );
  }
}

export default EditBio;
