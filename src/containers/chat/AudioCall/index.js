import React, { Component } from 'react';
import { View } from 'native-base';
import io from 'socket.io-client';
import { RTCPeerConnection, RTCMediaStream, RTCIceCandidate, RTCSessionDescription, RTCView, MediaStreamTrack, getUserMedia } from 'react-native-webrtc';

export default class Call extends Component {
  constructor(props) {
    super(props);

    this.socket = io.connect('https://react-native-webrtc.herokuapp.com', { transports: ['websocket'] });

    this.state = {
      externalStreamURL: '',
      internalStreamURL: ''
    };
  }

  render() {
    return (
      <View style={s.main}>
        <RTCView style={s.externalVideo} streamURL={this.state.externalStreamURL}/>
        <RTCView style={s.internalVideo} streamURL={this.state.internalStreamURL}/>
      </View>
    );
  }
}

const s = {
  main: {
    width: '100%',
    height: '100%',
    display: 'flex'
  },
  externalVideo: {
    backgroundColor: 'green',
    width: '100%',
    height: '50%',
    borderWidth: 1,
    borderColor: '#d6d7da'
  },
  internalVideo: {
    backgroundColor: 'red',
    width: '100%',
    height: '50%',
    borderWidth: 1,
    borderColor: '#d6d7da'
  }
};