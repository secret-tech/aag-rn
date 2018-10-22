import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { TouchableOpacity } from 'react-native';
import { Container, Content, Text, Header, Left, Button, Icon, Body, Title, Right, View } from 'native-base';

import s from './styles';

class EditProfile extends Component {
  nav = (id, routeName) => this.props.navigation.navigate(id, {}, NavigationActions.navigate({ routeName }));

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
            <Title>Edit profile</Title>
          </Body>
          <Right/>
        </Header>
        <Content>
          <View style={s.wrapper}>
            <View style={s.block}>
              <Text style={s.title}>Bio</Text>

              <TouchableOpacity onPress={() => this.nav('Profile', 'ProfileEditBio')}>
                <View style={s.bio}>
                  <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a ante ultrices, pretium diam eu, pretium sapien. Sed luctus bibendum ante non semper.</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={s.block}>
              <Text style={s.title}>Interests</Text>

              <View style={s.tags}>
                <Text style={s.tag}>Movies</Text>
                <Text style={s.tag}>Rock</Text>
                <Text style={s.tag}>Trips</Text>
                <Text style={s.tag}>Internet memes</Text>
                <Text style={s.tag}>TV shows</Text>
                <Text style={s.tag}>Harry Potter</Text>
                <Text style={s.tag}>Game of Thrones</Text>
                <Text style={s.tag}>Star Wars</Text>
                <Text style={s.tag}>Playstation 4</Text>
              </View>

              <Button block bordered onPress={() => this.nav('Profile', 'ProfileEditTags')}>
                <Text>Manage interests</Text>
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

export default EditProfile;