import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Container, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';

import { fetchRooms } from '../../../redux/ducks/chat/rooms';

// import withBack from '../../../hoc/AnroidBackHandler';


class Rooms extends Component {
  componentWillMount() {
    this.props.fetchRooms();
  }

  nav = (id, routeName, params) => 
    this.props.navigation.navigate({
      routeName: id, 
      params, 
      action: NavigationActions.navigate({ routeName, params })
    });

  renderRoom = (room) => {
    console.log(room);
    getLastText = (msgs) => msgs.length ? msgs[0].text : null;
    getLastTime = (msgs) => msgs.length ? new Date(msgs[0].createdAt).toLocaleDateString('en-US') : null;

    return (
      <ListItem key={room._id} avatar button onPress={() => this.nav('Chat', 'ChatChat', { id: room._id })}>
        <Left style={{ borderBottomWidth: 0 }}>
          <Thumbnail source={{ uri: room.friend.picture }} />
        </Left>
        <Body style={{ borderBottomWidth: 0 }}>
          <Text>{room.friend.name}</Text>
          <Text note>{getLastText(room.messages)}</Text>
        </Body>
        <Right style={{ borderBottomWidth: 0 }}>
          <Text note>{getLastTime(room.messages)}</Text>
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
            {conversations.map(this.renderRoom)}
          </List>
        </Content>
      </Container>
    );
  }
}

// const ComponentWithBack = withBack(Rooms);

export default connect(
  (state) => ({
    conversations: state.chat.rooms.conversations
  }),
  {
    fetchRooms
  }
)(Rooms);
