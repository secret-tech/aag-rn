import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { View, Text } from 'native-base';

import CallButton from '../../../components/chat/CallButton';

import { reqAcceptCall, reqDeclineCall } from '../../../redux/ducks/chat/call';

import s from './styles';

class IncomingCall extends Component {
  constructor(props) {
    super(props);

    this.conversationId = this.props.navigation.state.params.conversationId || '';
  }

  accept = () => {
    this.props.reqAcceptCall(this.conversationId);
  }

  decline = () => {
    this.props.reqDeclineCall(this.conversationId);
  }

  render() {
    console.log(this.props);
    const { user } = this.props.navigation.state.params;

    return (
      <View style={s.container}>
        <Image style={s.image} resizeMode="cover" source={{ uri: user.picture }} blurRadius={5}/>
        <View style={s.dialer}>

          <View style={s.title}>
            <Text style={s.name}>{user.firstName}</Text>
            <Text style={s.call}>Incoming Askagirl video call</Text>
          </View>

          <View style={s.controls}>
            <View style={s.button}>
              <CallButton 
                onPress={this.accept}
                text="Accept" 
                iconName="call" 
                backgroundColor="#4dd964" 
                iconColor="#fff"/>
            </View>
            
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
    reqAcceptCall,
    reqDeclineCall
  }
)(IncomingCall);
