import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { StatusBar } from 'react-native';
import { Footer, FooterTab, Button } from 'native-base';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import s from './styles';

class CustomTabNavigator extends Component {
  static navigationOptions = {
    title: 'Welcome'
  }

  nav = (id, routeName) => this.props.navigation.navigate(id, {}, NavigationActions.navigate({ routeName }));

  render() {
    const size = 22;
    const color = '#000';
    const activeColor = '#6546fa';
    const active = this.props.navigation.state.routes[this.props.navigation.state.index].routeName;

    return (
      <Footer style={s.wrap}>
        <StatusBar barStyle="dark-content"/>

        <FooterTab style={s.footer}>
          <Button transparent onPress={() => this.nav('Explore', 'ExploreExplore')}>
            <Icon name='feed' size={size} color={active === 'Explore' ? activeColor : color} />
          </Button>

          <Button transparent onPress={() => this.nav('Chat', 'ChatRooms')}>
            <Icon name='bubbles' size={size} color={active === 'Chat' ? activeColor : color} />
          </Button>

          <Button transparent onPress={() => this.nav('Profile', 'ProfileProfile')}>
            <Icon name='user' size={size} color={active === 'Profile' ? activeColor : color} />
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

export default CustomTabNavigator;