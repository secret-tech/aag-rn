import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { TouchableOpacity } from 'react-native';
import { Container, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';

import { socketConnect, openConversation } from '../../../redux/ducks/chat/rooms';


class Rooms extends Component {
  componentWillMount() {
    console.log('mounted');
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

    return (
      <ListItem 
        key={conversation._id}
        avatar 
        button 
        onPress={() => this.props.openConversation(conversation.friend._id)}>
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
        <TouchableOpacity onPress={() => this.props.navigation.navigate('ChatAudioCall')}><Text>OPEN AUDIOCALL VIEW</Text></TouchableOpacity>
        <Content>
          <List>
            {conversations
              .sort((a, b) => {
                const ats = a.messages.length > 0 ? new Date(a.messages[0].createdAt).getTime() : 0;
                const bts = b.messages.length > 0 ? new Date(b.messages[0].createdAt).getTime() : 1;
                return bts - ats;
              })
              .map(this.renderConversation)}
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
    openConversation
  }
)(Rooms);
