import React, { Component } from 'react';
import io from 'socket.io-client';
import { Container, Header, Left, Body, Right, Text, Button, Icon, Title } from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat';

import Spinner from '../../../components/common/Spinner';

import { getToken, getUserId } from '../../../utils/auth';

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
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: {
        _id: ''
      },
      friend: {
        _id: ''
      },
      messages: []
    }
  }

  initSocket = async () => {
    const token = await getToken();
    const userId = await getUserId();

    this.userId = userId;

    // create socket instance
    this.socket = io.connect('ws://aag.secrettech.io', {
      autoConnect: false,
      query: {
        token,
        conversationId: this.props.navigation.state.params.id
      }
    });

    // add handlers
    this.socket.on('loadConversation', ({ user, friend, messages }) => {
      this.setState({
        loading: false,
        user,
        friend,
        messages: GiftedChat.append(this.state.messages, messages)
      }, () => {
        console.log(this.state);
      });
    });

    this.socket.on('message', (message) => {
      console.log('message', this.state.user.name, message);
      this.setState({
        messages: GiftedChat.append(this.state.messages, [message])
      });
    });

    // open connection
    this.socket.open();
  }

  componentWillMount() {
    this.initSocket();
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  onSend = (messages) => {
    this.setState((prevState) => ({
      messages: GiftedChat.append(prevState.messages, messages),
    }));

    console.log(messages);

    messages.forEach((message) => {
      const msg = {
        createdAt: message.createdAt,
        text: message.text,
        conversationId: this.props.navigation.state.params.id,
        senderId: this.state.user._id,
        receiverId: this.state.friend._id
      };
      this.socket.emit('message', msg);
      console.log('emitted', msg);
    });
  }

  render() {
    return this.state.loading
      ? <Spinner/>
      : (
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
          user={this.state.user}/>
      </Container>
    );
  }
}

export default Chat;
