import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation, NavigationActions } from 'react-navigation';
import TabNavigator from '../../../navigation/TabNavigator';

import { initSocket } from '../../../redux/ducks/chat/rooms';
import { fetchProfile } from '../../../redux/ducks/profile/profile';

class Main extends Component {
  constructor (props) {
    super(props);
    this.onBackPress = this.onBackPress.bind(this);
  }

  componentWillMount() {
    this.props.initSocket();
    this.props.fetchProfile();

    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress () {
    const { nav } = this.props;
    this.props.navigation.dispatch(NavigationActions.back());
    return nav !== this.props.nav;
  }

  render() {
    return <TabNavigator navigation={this.props.navigation}/>;
  }
}

Main.router = TabNavigator.router;

export default connect(
  (state) => ({
    nav: state.nav
  }),
  {
    initSocket,
    fetchProfile
  }
)(withNavigation(Main));