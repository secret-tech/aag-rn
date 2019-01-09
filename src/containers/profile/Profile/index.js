import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { SafeAreaView, Image } from 'react-native';
import { Container, Content, View, Text, Button } from 'native-base';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import Spinner from '../../../components/common/Spinner';

import s from './styles';

class Profile extends Component {
  nav = (id, routeName) => this.props.navigation.navigate(id, {}, NavigationActions.navigate({ routeName }));

  render() {
    const { loading, picture, firstName, lastName, age, bio, tags } = this.props.profile.toJS();

    return loading
      ? <Spinner/>
      : (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
          <Container>
            <Content>
              <View style={s.profile}>
                <Button style={s.settings} transparent onPress={() => this.nav('Profile', 'ProfileSettings')}>
                  <Icon name='settings' size={24} color='#000' />
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
        </SafeAreaView>
    );
  }
}

export default connect(
  (state) => ({
    profile: state.profile.profile
  })
)(Profile);
