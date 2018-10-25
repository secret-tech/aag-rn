import React, { Component } from 'react';
import io from 'socket.io-client';
import { Container, Header, Left, Body, Right, Text, Button, Icon, Title } from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat';

const MESSAGES = [
  {
    _id: '962990ca-c3ef-4881-aa88-e147b75b63b1',
    text: 'heeey',
    createdAt: new Date(Date.UTC(2018, 9, 25, 15, 0, 0)),
    user: {
      _id: 0,
      name: 'Aidar',
      avatar: 'https://api.adorable.io/avatars/285/aidar.png',
    }
  },
  {
    _id: '962990ca-c3ef-4881-aa88-e147b75b63b2',
    text: 'what up?',
    createdAt: new Date(Date.UTC(2018, 9, 25, 15, 0, 20)),
    user: {
      _id: 0,
      name: 'Aidar',
      avatar: 'https://api.adorable.io/avatars/285/aidar.png',
    }
  },
  {
    _id: '962990ca-c3ef-4881-aa88-e147b75b63b3',
    text: 'sup',
    createdAt: new Date(Date.UTC(2018, 9, 25, 15, 1, 16)),
    user: {
      _id: 1,
      name: 'Andrey',
      avatar: 'https://api.adorable.io/avatars/285/andrey.png',
    }
  },
];

class Chat extends Component {
  state = {
    messages: []
  }

  componentWillMount() {
    this.socket = io('ws://aag.secrettech.io');

    console.log(this);

    // init
    this.setState({ messages: MESSAGES });
  }

  onSend = (messages) => {
    this.setState((prevState) => ({
      messages: GiftedChat.append(prevState.messages, messages),
    }))
  }

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
            <Title>Andrey</Title>
          </Body>
          <Right/>
        </Header>

        <GiftedChat
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          inverted={true}
          user={{ _id: 0 }}/>
      </Container>
    );
  }
}

export default Chat;
