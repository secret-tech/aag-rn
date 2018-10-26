import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { Container, Content, View, Text, Button } from 'native-base';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import { fetchProfile } from '../../../redux/ducks/profile/profile';

// import withBack from '../../../hoc/AnroidBackHandler';
import Spinner from '../../../components/common/Spinner';

import s from './styles';

class Profile extends Component {
  componentWillMount() {
    this.props.fetchProfile();
  }

  nav = (id, routeName) => this.props.navigation.navigate(id, {}, NavigationActions.navigate({ routeName }));

  render() {
    const { loading, picture, name, age, bio, tags } = this.props.profile.toJS();

    return loading
      ? <Spinner/>
      : (
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
              <Text style={s.name}>{name}, {age}</Text>
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

// const ComponentWithBack = withBack(Profile);

export default connect(
  (state) => ({
    profile: state.profile.profile
  }), 
  {
    fetchProfile
  }
)(Profile);
