import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { Container, Content, Text, Header, Left, Button, Icon, Body, Title, Right, List, ListItem, Separator } from 'native-base';

import { signOut } from '../../../redux/ducks/auth/auth';

import s from './styles';

class Settings extends Component {
  nav = (id, routeName) => this.props.navigation.navigate(id, {}, NavigationActions.navigate({ routeName }));

  renderListItem = (title, onPress) => (
    <ListItem icon button onPress={onPress}>
      <Body>
        <Text>{title}</Text>
      </Body>
      <Right>
        <Icon active name="arrow-forward" />
      </Right>
    </ListItem>
  );

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
            <Title>Settings</Title>
          </Body>
          <Right/>
        </Header>
        <Content>
          <List>
            {this.renderListItem('Edit profile', () => this.nav('Profile', 'ProfileEditProfile'))}
            {/* his.renderListItem('Become advisor', () => this.nav('Profile', 'ProfileBecomeAdvisor')) */}

            <Separator/>

            <ListItem noIndent button onPress={() => this.props.signOut()}>
              <Text style={s.dangerButton}>Logout</Text>
            </ListItem>
            <ListItem noIndent button onPress={() => console.log('del acc')}>
              <Text style={s.dangerButton}>Delete account</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

export default connect(null, { signOut })(Settings);
