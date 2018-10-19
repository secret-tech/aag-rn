import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { Footer, FooterTab, Button } from 'native-base';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import s from './styles';

class CustomTabNavigator extends Component {
  static navigationOptions = {
    title: 'Welcome'
  }

  render() {
    const size = 22;
    const color = '#000';

    return (
      <Footer style={s.wrap}>
        <StatusBar barStyle="dark-content"/>

        <FooterTab style={s.footer}>
          <Button transparent onPress={() => this.props.navigation.navigate('Explore')}>
            <Icon name='feed' size={size} color={color} />
          </Button>

          <Button transparent onPress={() => this.props.navigation.navigate('Chat')}>
            <Icon name='bubbles' size={size} color={color} />
          </Button>

          <Button transparent onPress={() => this.props.navigation.navigate('Profile')}>
            <Icon name='user' size={size} color={color} />
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

export default CustomTabNavigator;