import React, { Component } from 'react';
import { Image } from 'react-native';
import { View, Text } from 'native-base';

import CallButton from '../../../components/chat/CallButton';

import s from './styles';

class IncomingCall extends Component {
  render() {
    return (
      <View style={s.container}>
        <Image style={s.image} resizeMode="cover" source={{ uri: 'https://images.pexels.com/photos/756453/pexels-photo-756453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }} blurRadius={10}/>
        <View style={s.dialer}>

          <View style={s.title}>
            <Text style={s.name}>Trudy Jezabel</Text>
            <Text style={s.call}>Askagirl video call</Text>
          </View>

          <View style={s.controls}>
            <View style={s.button}>
              <CallButton text="Accept" iconName="call" backgroundColor="#4dd964" iconColor="#fff"/>
            </View>
            
            <View style={s.button}>
              <CallButton text="Decline" iconName="call-end" backgroundColor="#ff3b2f" iconColor="#fff"/>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default IncomingCall;
