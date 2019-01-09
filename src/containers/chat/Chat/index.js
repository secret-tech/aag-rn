import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Left, Body, Right, Text, Button, Icon, Title } from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat';

import { loadConversation, purgeConversation, sendMessage, fetchMoreMessages } from '../../../redux/ducks/chat/rooms';

import { reqSendMessage, reqMessages, purgeMessages } from '../../../redux/ducks/chat/chat';
import { reqCall } from '../../../redux/ducks/chat/call';

import { getUser, getAnotherUser, transformMessage, revTransformMessage, transformUser } from '../Rooms/helpers';


class Chat extends Component {
  constructor(props) {
    super(props);

    this.conversationId = this.props.navigation.state.params.conversationId;
  }

  componentDidMount() {
    // clear messages
    this.props.purgeMessages();
    
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
      acc === 0 
        ? message.timestamp
        : message.timestamp < acc ? message.timestamp : acc, 0);

    this.props.reqMessages({ key, conversationId: this.conversationId });
  }

  render() {
    const { conversation, userId, messages } = this.props;
    const { users, id } = conversation;

    const user = getUser(users, userId);
    const anoterUser = getAnotherUser(users, userId);

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
            <Right>
              <Button transparent onPress={() => this.props.reqCall({ conversationId: id, user: anoterUser })}>
                <Icon name="ios-call" />
              </Button>
            </Right>
          </Header>

            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
              <GiftedChat
                messages={messages.map((message) => transformMessage(message))}
                onSend={this.sendMessage}
                inverted={true}
                user={transformUser(user)}
                loadEarlier={true}
                onLoadEarlier={this.fetchMoreMessages}/>
            </SafeAreaView>
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
    purgeMessages,
    reqCall
  }
)(Chat);
