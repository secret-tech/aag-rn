import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Left, Body, Right, Text, Button, Icon, Title } from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat';

import { loadConversation, purgeConversation, sendMessage } from '../../../redux/ducks/chat/rooms';


class Chat extends Component {
  componentDidMount() {
    this.props.loadConversation(this.props.navigation.state.params.conversationId);
  }

  sendMessage = (messages) => {
    const { conversationId } = this.props.navigation.state.params;

    this.props.sendMessage({
      messages,
      senderId: this.props.conversation.user._id,
      receiverId: this.props.conversation.friend._id,
      conversationId
    })
  }

  render() {
    console.log(this.props.conversation);

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
          user={this.props.conversation.user}/>
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
    sendMessage
  }
)(Chat);
