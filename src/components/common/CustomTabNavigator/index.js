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

  nav = (id, routeName) => 
    this.props.navigation.navigate(
      id, 
      {}, 
      NavigationActions.navigate({ routeName })
    );

  render() {
    const size = 22;
    const color = '#000';

    console.log(this.props, NavigationActions);

    return (
      <Footer style={s.wrap}>
        <StatusBar barStyle="dark-content"/>

        <FooterTab style={s.footer}>
          <Button transparent onPress={() => this.nav('Explore', 'SubExplore')}>
            <Icon name='feed' size={size} color={color} />
          </Button>

          <Button transparent onPress={() => this.nav('Chat', 'SubChat')}>
            <Icon name='bubbles' size={size} color={color} />
          </Button>

          <Button transparent onPress={() => this.nav('Profile', 'SubProfile')}>
            <Icon name='user' size={size} color={color} />
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

export default CustomTabNavigator;