import React, { Component } from 'react';
import { BackHandler, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation, NavigationActions } from 'react-navigation';
import OneSignal from 'react-native-onesignal';
import { View } from 'native-base';

import TabNavigator from '../../../navigation/TabNavigator';
import ReviewInternalNotification from '../ReviewInternalNotification';

import { initSocket } from '../../../redux/ducks/chat/rooms';
import { fetchProfile } from '../../../redux/ducks/profile/profile';
import { openNotification } from '../../../redux/ducks/common/review';

// Редиректить если onesignal opened
// Показывать тост с кнопкой если onesignal received

class Main extends Component {
  componentWillMount() {
    this.props.initSocket();
    this.props.fetchProfile();

    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    OneSignal.addEventListener('opened', (notify) => this.onOpenReviewNotification(notify.payload.additionalData));
    OneSignal.addEventListener('received', (notify) => this.onReceiveReviewNotification(notify.payload.additionalData));
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    OneSignal.removeEventListener('received');
    OneSignal.removeEventListener('opened');
  }

  onBackPress = () => {
    const { nav } = this.props;
    this.props.navigation.dispatch(NavigationActions.back());
    return nav !== this.props.nav;
  }

  nav = (id, routeName, params) => 
    this.props.navigation.navigate({
      routeName: id, 
      params, 
      action: NavigationActions.navigate({ routeName, params })
    });

  onReceiveReviewNotification = (params) => {
    if (params.review) {
      this.props.openNotification({
        id: params.userId,
        picture: params.userPicture,
        name: params.userName
      });
    }
  }

  onOpenReviewNotification = (params) => {
    if (params.review) {
      this.nav('Explore', 'ExploreReviewAdvisor', params)
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TabNavigator navigation={this.props.navigation}/>
        <ReviewInternalNotification/>
      </View>
    );
  }
}

Main.router = TabNavigator.router;

export default connect(
  (state) => ({
    nav: state.nav
  }),
  {
    initSocket,
    fetchProfile,
    openNotification
  }
)(withNavigation(Main));