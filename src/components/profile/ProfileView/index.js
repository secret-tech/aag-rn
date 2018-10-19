import React, { Component } from 'react';
import { withNavigation, NavigationActions } from 'react-navigation';
import { Image } from 'react-native';
import { Container, View, Text, Button } from 'native-base';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import s from './styles';

class ProfileView extends Component {
  nav = (id, routeName) => this.props.navigation.navigate(id, {}, NavigationActions.navigate({ routeName }));

  render() {
    return (
      <Container>
        <View style={s.profile}>
          <View style={s.pictureWrap}>
            <Image style={s.avatar} source={{ uri: 'https://images.pexels.com/photos/1492156/pexels-photo-1492156.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }} resizeMode="cover" />
          </View>

          <Button bordered onPress={() => this.nav('Profile', 'ProfileSettings')}>
            <Icon name='settings' size={30} color='#000' />
          </Button>

          <View style={s.nameWrap}>
            <Text style={s.name}>Lauren Mayberry, 25</Text>
          </View>

          <View style={s.bioWrap}>
            <Text style={s.bio}>Lorem ipsum dolor sit amet</Text>
          </View>

          <View style={s.tags}>
            <Text>Music</Text>
            <Text>Youtube</Text>
            <Text>Networking</Text>
            <Text>Development</Text>
            <Text>Video games</Text>
            <Text>Movies</Text>
          </View>
        </View>
      </Container>
    );
  }
}

export default withNavigation(ProfileView);