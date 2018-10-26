import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Container, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';

import { socketConnect } from '../../../redux/ducks/chat/rooms';
import { openOrCreateRoom } from '../../../redux/ducks/chat/room';

import Spinner from '../../../components/common/Spinner';


class Rooms extends Component {
  componentWillMount() {
    this.props.socketConnect();
  }

  openChat = (id) => this.props.navigation.navigate({
    routeName: 'Chat',
    params: { conversationId: id },
    action: NavigationActions.navigate({ 
      routeName: 'ChatChat', 
      params: { conversationId: id }
    })
  })

  renderConversation = (conversation) => {
    getLastText = (msgs) => msgs.length ? msgs[0].text : null;
    getLastTime = (msgs) => msgs.length ? new Date(msgs[0].createdAt).toLocaleDateString('en-US') : null;

    console.log(conversation);

    return (
      <ListItem 
        key={conversation._id}
        avatar 
        button 
        onPress={() => this.props.openOrCreateRoom(conversation.friend._id)}>
        <Left style={{ borderBottomWidth: 0 }}>
          <Thumbnail source={{ uri: conversation.friend.picture }} />
        </Left>
        <Body style={{ borderBottomWidth: 0 }}>
          <Text>{conversation.friend.name}</Text>
          <Text note>{getLastText(conversation.messages)}</Text>
        </Body>
        <Right style={{ borderBottomWidth: 0 }}>
          <Text note>{getLastTime(conversation.messages)}</Text>
        </Right>
      </ListItem>
    );
  }

  render() {
    const { conversations } = this.props;
    return (
      <Container>
        <Content>
          <List>
            {conversations.map(this.renderConversation)}
          </List>
        </Content>
      </Container>
    );
  }
}


export default connect(
  (state) => ({
    conversations: state.chat.rooms.conversations
  }),
  {
    socketConnect,
    openOrCreateRoom
  }
)(Rooms);
