import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Footer, FooterTab, Button, Text } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

import s from './styles';

class CustomTabNavigator extends Component {
  static navigationOptions = {
    title: 'Welcome'
  }

  nav = (id, routeName) => this.props.navigation.navigate(id);

  render() {
    const size = 30;
    const color = '#8e8e93';
    const activeColor = '#6546fa';
    const active = this.props.navigation.state.routes[this.props.navigation.state.index].routeName;

    return (
      <Footer style={s.wrap}>
        <FooterTab style={s.footer}>
          <Button style={s.button} transparent onPress={() => this.nav('Explore', 'ExploreExplore')}>
            <Icon style={s.icon} name='ios-search' size={size} color={active === 'Explore' ? activeColor : color} />
            <Text style={{ ...s.label, color: active === 'Explore' ? activeColor : color }}>Explore</Text>
          </Button>

          <Button style={s.button} transparent onPress={() => this.nav('Chat', 'ChatRooms')}>
            <Icon style={s.icon} name='ios-chatboxes' size={size} color={active === 'Chat' ? activeColor : color} />
            <Text style={{ ...s.label, color: active === 'Chat' ? activeColor : color }}>Messages</Text>
          </Button>

          <Button style={s.button} transparent onPress={() => this.nav('Profile', 'ProfileProfile')}>
            <Icon style={s.icon} name='ios-contact' size={size} color={active === 'Profile' ? activeColor : color} />
            <Text style={{ ...s.label, color: active === 'Profile' ? activeColor : color }}>Profile</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

export default CustomTabNavigator;