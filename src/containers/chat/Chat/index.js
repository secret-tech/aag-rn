import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Left, Body, Right, Text, Button, Icon, Title } from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat';

import { loadConversation, purgeConversation, sendMessage, fetchMoreMessages } from '../../../redux/ducks/chat/rooms';

import { reqSendMessage, reqMessages } from '../../../redux/ducks/chat/chat';

import { getUser, getAnotherUser, transformMessage, transformUser } from '../Rooms/helpers';


class Chat extends Component {
  componentDidMount() {
    const { conversationId } = this.props.navigation.state.params;

    // fetch first messages without key
    this.props.reqMessages({ conversationId });
  }

  sendMessage = (messages) => {
    const { conversationId } = this.props.navigation.state.params;

    this.props.reqSendMessage({
      messages,
      conversationId
    });
  }

  fetchMoreMessages = () => {
    const { conversationId } = this.props.navigation.state.params;

    // key is createdAt Date of last loaded message
    const key = this.props.conversation.messages.reduce((acc, msg, index) => {
      if (index === 0) return msg.createdAt;
      if (Date.parse(msg.createdAt) < Date.parse(acc)) return msg.createdAt;
      return acc;
    }, '');

    this.props.fetchMoreMessages({ key, conversationId });
  }

  render() {
    console.log('Chat', this.props);
    const { conversation, userId, messages } = this.props;
    const { users } = conversation;

    const user = getUser(users, userId);
    const anoterUser = getAnotherUser(users, userId);

    console.log(messages);

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
            <Title>{anoterUser.firstName}</Title>
          </Body>
          <Right/>
        </Header>

        <GiftedChat
          messages={messages.map((message) => transformMessage(message))}
          onSend={this.sendMessage}
          inverted={true}
          user={transformUser(user)}
          loadEarlier={true}
          onLoadEarlier={this.fetchMoreMessages}/>
      </Container>
    );
  }
}

export default connect(
  (state) => ({
    ...state.chat.chat,
    userId: state.profile.profile.get('id')
  }),
  {
    loadConversation,
    purgeConversation,
    sendMessage,
    fetchMoreMessages,

    reqSendMessage,
    reqMessages
  }
)(Chat);
