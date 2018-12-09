import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { View, Text } from 'native-base';

import CallButton from '../../../components/chat/CallButton';

import { reqDeclineCall } from '../../../redux/ducks/chat/call';

import s from './styles';

class OutgoingCall extends Component {
  constructor(props) {
    super(props);

    this.conversationId = this.props.navigation.state.params.conversationId || '';
  }

  decline = () => {
    this.props.reqDeclineCall(this.conversationId);
  }

  render() {
    const { user } = this.props.navigation.state.params;

    return (
      <View style={s.container}>
        <Image style={s.image} resizeMode="cover" source={{ uri: user.picture }} blurRadius={5}/>
        <View style={s.dialer}>

          <View style={s.title}>
            <Text style={s.name}>{user.firstName}</Text>
            <Text style={s.call}>Outgoing Askagirl video call</Text>
          </View>

          <View style={s.controls}>
            <View style={s.button}>
              <CallButton
                onPress={this.decline}
                text="Decline" 
                iconName="call-end" 
                backgroundColor="#ff3b2f" 
                iconColor="#fff"/>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(
  null,
  {
    reqDeclineCall
  }
)(OutgoingCall);
