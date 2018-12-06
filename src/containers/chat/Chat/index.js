import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Left, Body, Right, Text, Button, Icon, Title } from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat';

import { loadConversation, purgeConversation, sendMessage, fetchMoreMessages } from '../../../redux/ducks/chat/rooms';

import { reqSendMessage } from '../../../redux/ducks/chat/chat';

import { getAnotherUser } from '../Rooms/helpers';


class Chat extends Component {
  sendMessage = (messages) => {
    const { conversationId } = this.props.navigation.state.params;

    console.log('chat/sendMessage', messages, conversationId);

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

    const anoterUser = getAnotherUser(this.props.conversation.users);

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
          messages={this.props.conversation.messages}
          onSend={this.sendMessage}
          inverted={true}
          user={this.props.conversation.user}
          loadEarlier={true}
          onLoadEarlier={this.fetchMoreMessages}/>
      </Container>
    );
  }
}

export default connect(
  (state) => ({
    conversation: state.chat.chat.conversation
  }),
  {
    loadConversation,
    purgeConversation,
    sendMessage,
    fetchMoreMessages,

    reqSendMessage
  }
)(Chat);
