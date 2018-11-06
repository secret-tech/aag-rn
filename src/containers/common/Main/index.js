import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation, NavigationActions } from 'react-navigation';
import OneSignal from 'react-native-onesignal';
import { View } from 'native-base';

import TabNavigator from '../../../navigation/TabNavigator';
import ReviewInternalNotification from '../ReviewInternalNotification';

import { initSocket } from '../../../redux/ducks/chat/rooms';
import { fetchProfile } from '../../../redux/ducks/profile/profile';
import { openNotification, setAdvisor } from '../../../redux/ducks/common/review';


class Main extends Component {
  componentWillMount() {
    this.props.initSocket();
    this.props.fetchProfile();

    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    OneSignal.addEventListener('opened', (notify) => this.onOpenReviewNotification(notify));
    OneSignal.addEventListener('received', (notify) => this.onReceiveReviewNotification(notify));
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

  nav = (id, routeName, params) => {
    this.props.navigation.navigate({
      routeName: id, 
      params, 
      action: NavigationActions.navigate({ routeName, params })
    });
  }

  onReceiveReviewNotification = (notification) => {
    // TODO requires refactor
    const review = notification 
      && notification.payload 
      && notification.payload.additionalData 
      && notification.payload.additionalData.review 
      || null;

    if (review) {
      const {
        payload: {
          additionalData: {
            userId: id,
            userPicture: picture,
            userName: name
          }
        }
      } = notification;

      this.props.openNotification({ id, picture, name });
    }
  }

  onOpenReviewNotification = (notification) => {
    console.log('open notification', notification);
    // TODO requires refactor
    const review = notification
      && notification.notification
      && notification.notification.payload 
      && notification.notification.payload.additionalData 
      && notification.notification.payload.additionalData.review 
      || null;

    if (review) {
      const {
        notification: {
          payload: {
            additionalData: {
              userId: id,
              userPicture: picture,
              userName: name
            }
          }
        }
      } = notification;

      console.log({ id, picture, name });
      this.props.setAdvisor({ id, picture, name });
      this.nav('Explore', 'ExploreReviewAdvisor');
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
    openNotification,
    setAdvisor
  }
)(withNavigation(Main));