import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { Container, Content, View, Text, Button } from 'native-base';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import InCallManager from 'react-native-incall-manager';

import Spinner from '../../../components/common/Spinner';

import s from './styles';

class Profile extends Component {
  nav = (id, routeName) => this.props.navigation.navigate(id, {}, NavigationActions.navigate({ routeName }));

  componentWillMount() {
    InCallManager.start({ media: 'video' });
  }

  componentWillUnmount() {
    InCallManager.stop();
  }

  start = () => {
    InCallManager.startRingtone('DEFAULT');
  }

  stop = () => {
    InCallManager.stopRingtone();
  }

  render() {
    const { loading, picture, firstName, lastName, age, bio, tags } = this.props.profile.toJS();

    return loading
      ? <Spinner/>
      : (
      <Container>
        <Content>
          <View style={s.profile}>
            <Button style={s.settings} transparent onPress={() => this.nav('Profile', 'ProfileSettings')}>
              <Icon name='settings' size={24} color='#000' />
            </Button>

            <Button onPress={this.start}>
              <Icon name='control-play' size={24} color='#000' />
            </Button>
            <Button onPress={this.stop}>
              <Icon name='control-pause' size={24} color='#000' />
            </Button>

            <View style={s.pictureWrap}>
              <Image style={s.avatar} source={{ uri: picture }} resizeMode="cover" />
            </View>

            <View style={s.nameWrap}>
              <Text style={s.name}>{firstName} {lastName}{age && `, ${age}`}</Text>
            </View>

            <View style={s.bioWrap}>
              <Text style={s.bio}>{bio}</Text>
            </View>

            <View style={s.tagsWrap}>
              {tags.map((tag, i) => <Text style={s.tag} key={`${tag}-${i}`}>{tag}</Text>)}
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

export default connect(
  (state) => ({
    profile: state.profile.profile
  })
)(Profile);
