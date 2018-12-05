import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { View, Button, Text } from 'native-base';
import io from 'socket.io-client';
import { RTCPeerConnection, RTCMediaStream, RTCIceCandidate, RTCSessionDescription, RTCView, MediaStreamTrack, getUserMedia } from 'react-native-webrtc';

const PEERS = {};

export default class Call extends Component {
  constructor(props) {
    super(props);

    this.socket = io.connect('https://react-native-webrtc.herokuapp.com', { transports: ['websocket'] });
    this.configuration = {'iceServers': [{ 'url': 'stun:stun.l.google.com:19302' }]};

    this.state = {
      peers: {},
      externalStream: '',
      internalStream: ''
    };
  }

  componentDidMount() {
    this.getInternalStream(true, (stream) => this.setState({ internalStream: stream }));

    this.socket.on('exchange', (data) => this.exchange(data));
    this.socket.on('connect', (data) => {
      this.getInternalStream(true, (stream) => this.setState({ internalStream: stream }));
    });
  }

  join = (roomId) => {
    this.socket.emit('join', roomId, (socketIds) => {
      for (const index in socketIds) {
        const socketId = socketIds[index];
        this.createPeerConnection(socketId, true);
      }
    });
  }

  exchange = (data) => {
    // const peerConn = this.createPeerConnection(data.from, false);
    let peerConnection;
    if (data.from in PEERS) {
      peerConnection = PEERS[data.from];
    } else {
      peerConnection = this.createPeerConnection(data.from, false);
    }

    if (data.sdp) {
      peerConnection.setRemoteDescription(new RTCSessionDescription(data.sdp), () => {
        if (peerConnection.remoteDescription.type === 'offer') {
          peerConnection.createAnswer((description) => {
            console.log('create answer', description);
            peerConnection.setLocalDescription(description, () => {
              console.log('set local description', peerConnection.localDescription, description);
              this.socket.emit('exchange', { to: data.from, sdp: peerConnection.localDescription });
            }, (e) => console.log(e));
          }, (e) => console.log(e));
        }
      }, (e) => console.log(e));
    } else {
      console.log('exchange candidate', data);
      peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
    }
  }

  createPeerConnection = (peerId, isOffer) => {
    const peerConnection = new RTCPeerConnection(this.configuration);

    PEERS[peerId] = peerConnection;

    const createOffer = () => {
      peerConnection.createOffer((description) => {
        console.log('create offer', description);
        peerConnection.setLocalDescription(description, () => {
          console.log('set local description', description);
          this.socket.emit('exchange', { to: peerId, sdp: peerConnection.localDescription });
        }, (e) => console.log(e));
      }, (e) => console.log(e));
    }

    peerConnection.onaddstream = (event) => this.setState({ externalStream: event.stream });
    peerConnection.onnegotiationneeded = () => isOffer ? createOffer() : null;
    peerConnection.addStream(this.state.internalStream);

    return peerConnection;
  }

  getInternalStream = (isFrontSource, callback) => {
    const options = {
      audio: true,
      video: {
        facingMode: 'user',
        mandatory: {
          minWidth: Dimensions.get('window').width,
          minHeight: Dimensions.get('window').height,
          minFrameRate: 30
        }
      }
    };

    getUserMedia(options, (stream) => callback(stream), (e) => console.log(e));
  }

  render() {
    const {
      externalStream,
      internalStream
    } = this.state;

    return (
      <View style={s.main}>
        <RTCView style={s.externalVideo} streamURL={externalStream && externalStream.toURL()}/>
        <RTCView style={s.internalVideo} streamURL={internalStream && internalStream.toURL()}/>
        <View style={s.button}>
          <Button onPress={() => this.join('pidor')}><Text>JOIN</Text></Button>
        </View>
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
    width: '100%',
    height: '100%'
  },
  button: {
    position: 'absolute',
    bottom: 10,
    right: 10
  }
};