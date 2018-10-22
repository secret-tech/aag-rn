import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { Container, Content, View, Text, Button } from 'native-base';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import s from './styles';

class Profile extends Component {
  nav = (id, routeName) => this.props.navigation.navigate(id, {}, NavigationActions.navigate({ routeName }));

  render() {
    return (
      <Container>
        <Content>
          <View style={s.profile}>
            <Button style={s.settings} transparent onPress={() => this.nav('Profile', 'ProfileSettings')}>
              <Icon name='settings' size={24} color='#000' />
            </Button>

            <View style={s.pictureWrap}>
              <Image style={s.avatar} source={{ uri: 'https://images.pexels.com/photos/1492156/pexels-photo-1492156.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }} resizeMode="cover" />
            </View>

            <View style={s.nameWrap}>
              <Text style={s.name}>Lauren Mayberry, 25</Text>
            </View>

            <View style={s.bioWrap}>
              <Text style={s.bio}>Lorem ipsum dolor sit amet</Text>
            </View>

            <View style={s.tagsWrap}>
              <Text style={s.tag}>Music</Text>
              <Text style={s.tag}>Youtube</Text>
              <Text style={s.tag}>Networking</Text>
              <Text style={s.tag}>Development</Text>
              <Text style={s.tag}>Video games</Text>
              <Text style={s.tag}>Movies</Text>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

export default connect(null, null)(Profile);
