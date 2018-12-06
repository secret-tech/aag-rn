import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { TouchableOpacity } from 'react-native';
import { Container, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';

import { reqConversations } from '../../../redux/ducks/chat/rooms';
import { reqFindOrCreateConversation } from '../../../redux/ducks/chat/chat';

import { sortConversations, getAnotherUser } from './helpers';


class Rooms extends Component {
  componentWillMount() {
    this.props.reqConversations();
  }

  renderConversation = (conversation) => {
    const anotherUser = getAnotherUser(conversation.users, this.props.userId);

    console.log(anotherUser);

    return (
      <ListItem 
        key={conversation.id}
        avatar 
        button 
        onPress={() => this.props.reqFindOrCreateConversation(anotherUser.id)}>
        <Left style={{ borderBottomWidth: 0 }}>
          <Thumbnail source={{ uri: anotherUser.picture }} />
        </Left>
        <Body style={{ borderBottomWidth: 0 }}>
          <Text>{anotherUser.firstName}</Text>
          <Text note>{conversation.lastMessage.message}</Text>
        </Body>
        <Right style={{ borderBottomWidth: 0 }}>
          <Text note>{new Date(conversation.lastMessage.timestamp).toLocaleDateString('en-US')}</Text>
        </Right>
      </ListItem>
    );
  }

  render() {
    const { conversations } = this.props;

    console.log('Rooms props', this.props);

    return (
      <Container>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('ChatAudioCall')}>
          <Text>OPEN AUDIOCALL VIEW</Text>
        </TouchableOpacity>
        <Content>
          <List>
            {sortConversations(conversations).map((conversation) => this.renderConversation(conversation))}
          </List>
        </Content>
      </Container>
    );
  }
}


export default connect(
  (state) => ({
    ...state.chat.rooms,
    userId: state.profile.profile.get('id')
  }),
  {
    reqConversations,
    reqFindOrCreateConversation
  }
)(Rooms);
