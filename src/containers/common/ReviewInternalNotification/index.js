import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { withNavigation, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { View, Text } from 'native-base';
import Modal from 'react-native-modal';

import { closeNotification } from '../../../redux/ducks/common/review';

import s from './styles';

class ReviewInternalNotification extends Component {
  nav = (id, routeName, params) => 
    this.props.navigation.navigate({
      routeName: id, 
      params, 
      action: NavigationActions.navigate({ routeName, params })
    });

  open = () => {
    this.props.closeNotification();
    this.nav('Explore', 'ExploreReviewAdvisor');
  }

  render() {
    const { open, advisor } = this.props.review.toJS();

    // TODO
    // We can't use swipe, coz useNativeDriver props not working with that correctly.
    // All animations doesn't work without useNativeDriver props.
    // Issue: https://github.com/react-native-community/react-native-modal/issues/163

    return (
      <Modal 
        isVisible={open}
        onBackdropPress={() => this.props.closeNotification()}
        onBackButtonPress={() => this.props.closeNotification()}
        style={s.modal}
        animationIn="slideInDown"
        animationInTiming={300}
        animationOut="slideOutUp"
        animationOutTiming={300}
        useNativeDriver={true}>
        <View style={s.content}>
          <TouchableOpacity onPress={this.open}>
            <Text>Hey! Press here to review {advisor.name} advision</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

export default connect(
  (state) => ({
    review: state.common.review
  }),
  {
    closeNotification
  }
)(withNavigation(ReviewInternalNotification));
