import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Left, Body, Right, Text, Button, Icon, Title } from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat';

import { loadConversation, purgeConversation, sendMessage, fetchMoreMessages } from '../../../redux/ducks/chat/rooms';


class Chat extends Component {
  componentWillMount() {
    this.props.loadConversation(this.props.navigation.state.params.conversationId);
  }

  sendMessage = (messages) => {
    const { conversationId } = this.props.navigation.state.params;

    this.props.sendMessage({
      messages,
      senderId: this.props.conversation.user._id,
      receiverId: this.props.conversation.friend._id,
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
            <Title>{this.props.conversation.friend.name}</Title>
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
    conversation: state.chat.rooms.conversation
  }),
  {
    loadConversation,
    purgeConversation,
    sendMessage,
    fetchMoreMessages
  }
)(Chat);
