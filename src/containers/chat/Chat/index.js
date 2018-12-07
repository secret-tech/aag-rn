import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Left, Body, Right, Text, Button, Icon, Title } from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat';

import { loadConversation, purgeConversation, sendMessage, fetchMoreMessages } from '../../../redux/ducks/chat/rooms';

import { reqSendMessage, reqMessages, purgeMessages } from '../../../redux/ducks/chat/chat';

import { getUser, getAnotherUser, transformMessage, revTransformMessage, transformUser } from '../Rooms/helpers';


class Chat extends Component {
  constructor(props) {
    super(props);

    this.conversationId = this.props.navigation.state.params.conversationId;
  }

  componentDidMount() {
    // fetch first messages without key
    this.props.reqMessages({ conversationId: this.conversationId });
  }

  componentWillUnmount() {
    this.props.purgeMessages();
  }

  sendMessage = (messages) => {
    this.props.reqSendMessage({
      messages: messages.map((message) => revTransformMessage(message)),
      conversationId: this.conversationId
    });
  }

  fetchMoreMessages = () => {
    // key is createdAt Date of last loaded message
    const key = this.props.messages.reduce((acc, message, index) => 
      message.timestamp > acc ? message.timestamp : acc, 0);

    this.props.reqMessages({ key, conversationId: this.conversationId });
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
    reqSendMessage,
    reqMessages,
    purgeMessages
  }
)(Chat);
