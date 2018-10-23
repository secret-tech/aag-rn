import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { TouchableOpacity } from 'react-native';
import { Container, Content, Text, Header, Left, Button, Icon, Body, Title, Right, View } from 'native-base';

import s from './styles';

class EditProfile extends Component {
  nav = (id, routeName) => this.props.navigation.navigate(id, {}, NavigationActions.navigate({ routeName }));

  render() {
    const renderTags = () => this.props.tags.toJS().length > 0
      ? (
        <View style={s.tags}>
          {this.props.tags.toJS().map((tag, i) => <Text style={s.tag} key={`${tag}-${i}`}>{tag}</Text>)}
        </View>
      )
      : (
        <View style={s.emptyTags}>
          <Text>Add few interests to get better recomendations</Text>
        </View>
      );

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back' />
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
                  <Text>{this.props.bio || 'Tap to edit your bio'}</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={s.block}>
              <Text style={s.title}>Interests</Text>

              {renderTags()}

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

export default connect((state) => ({
  bio: state.profile.profile.get('bio'),
  tags: state.profile.profile.get('tags')
}))(EditProfile);