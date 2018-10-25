import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Button, Icon, Title } from 'native-base';

const ROOMS = [
  {
    _id: 0,
    text: 'Hello',
    createdAt: new Date(Date.UTC(2018, 1, 1, 15, 0, 0)),
    user: {
      _id: 1,
      name: 'Andrey',
      avatar: 'https://api.adorable.io/avatars/285/andrey.png',
    }
  },
  {
    _id: 1,
    text: 'thank you',
    createdAt: new Date(Date.UTC(2018, 1, 1, 15, 0, 0)),
    user: {
      _id: 2,
      name: 'John Doe',
      avatar: 'https://api.adorable.io/avatars/285/johndoe.png',
    }
  },
  {
    _id: 2,
    text: 'omg look at this',
    createdAt: new Date(Date.UTC(2018, 1, 1, 15, 0, 0)),
    user: {
      _id: 3,
      name: 'Mary Elizabeth Winstead',
      avatar: 'https://api.adorable.io/avatars/285/marymary.png',
    }
  },
  {
    _id: 3,
    text: 'omg look at this',
    createdAt: new Date(Date.UTC(2018, 1, 1, 15, 0, 0)),
    user: {
      _id: 4,
      name: 'July Brown',
      avatar: 'https://api.adorable.io/avatars/285/july.png',
    }
  }
]

class Rooms extends Component {
  nav = (id, routeName, params) => 
    this.props.navigation.navigate({
      routeName: id, 
      params, 
      action: NavigationActions.navigate({ routeName, params })
    });

  renderRoom = (room) => {
    return (
      <ListItem key={room._id} avatar button onPress={() => this.nav('Chat', 'ChatChat', { id: room._id })}>
        <Left style={{ borderBottomWidth: 0 }}>
          <Thumbnail source={{ uri: room.user.avatar }} />
        </Left>
        <Body style={{ borderBottomWidth: 0 }}>
          <Text>{room.user.name}</Text>
          <Text note>{room.text}</Text>
        </Body>
        <Right style={{ borderBottomWidth: 0 }}>
          <Text note>{room.createdAt.toLocaleDateString('en-US')}</Text>
        </Right>
      </ListItem>
    );
  }

  render() {
    return (
      <Container>
        <Content>
          <List>
            {ROOMS.map(this.renderRoom)}
          </List>
        </Content>
      </Container>
    );
  }
}

export default Rooms;
