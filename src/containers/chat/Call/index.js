import React, { Component } from 'react';
import { Dimensions, Image } from 'react-native';
import { View, Button, Text } from 'native-base';
import io from 'socket.io-client';
import { RTCPeerConnection, RTCMediaStream, RTCIceCandidate, RTCSessionDescription, RTCView, MediaStreamTrack, getUserMedia } from 'react-native-webrtc';

import CallButton from '../../../components/chat/CallButton';

import socketService from '../../../utils/socketService';

import s from './styles';

const LOCAL_STREAM_OPTIONS = {
  audio: true,
  video: {
    facingMode: 'user',
    mandatory: {
      minWidth: 90,
      minHeight: 160,
      minFrameRate: 30
    }
  }
};

const OFFER_OPTIONS = {
  offerToReceiveAudio: true,
  offerToReceiveVideo: true
};


class Call extends Component {
  constructor(props) {
    super(props);

    this.configuration = {'iceServers': [{ 'url': 'stun:stun.l.google.com:19302' }]};

    this.localPeer = null;
    this.remotePeer = null;

    this.state = {
      localStream: null,
      remoteStream: null
    };
  }

  async componentWillMount() {
    // Создаем пир конекшоны
    this.localPeer = new RTCPeerConnection(this.configuration);
    this.remotePeer = new RTCPeerConnection(this.configuration);

    // обработчик айс кандидатов
    this.localPeer.onicecandidate = ({ candidate }) => {
      console.log('onicecandidate', candidate);
      const body = { conversationId: this.props.navigation.state.params.conversationId, candidate };
      if (candidate) this.socket.emit('req:ice', body);
    };

    // Создаем локал стрим
    await getUserMedia(
      LOCAL_STREAM_OPTIONS, 
      (stream) => this.setState({ localStream: stream }), 
      (e) => console.log(e)
    );

    // добавляем треки в локал пир
    this.localPeer.addStream(this.state.localStream);

    // инитим сокет
    await this.initSocket();

    // хандлим трек
    this.localPeer.onaddstream = (event) => {
      console.log('onaddstream', event);
      this.setState({ remoteStream: event.stream });
    };
  }

  componentWillUnmount() {}

  async initSocket() {
    this.socket = await socketService();

    // Делать то, что скажет сервер
    this.socket.on('res:uCaller', this.createOffer);
    this.socket.on('res:offer', this.handleIncomingOffer);
    this.socket.on('res:answer', this.handleAnswer);
    this.socket.on('res:ice', this.handleNewIceCandidate);

    // Сказать серверы что клиент готов к труду о обороне в conversationId
    this.socket.emit('req:imReady', this.props.navigation.state.params.conversationId);
  }

  // запускаем при res:uCaller
  // p1 создаем офер и устанаваливаем локал дескр для себя
  // эмитим событие req:offer
  createOffer = () => {
    console.log('createOffer called');
    this.localPeer.createOffer((description) => {
      console.log('localPeer.createOffer', description);
      this.localPeer.setLocalDescription(description, () => {
        const body = { conversationId: this.props.navigation.state.params.conversationId, description };
        console.log('res:uCaller', body);
        this.socket.emit('req:offer', body);
      }, (e) => console.log(e));
    }, (e) => console.log(e), OFFER_OPTIONS);
  }

  // запускаем при res:offer
  // p2 устанавливаем ремоут дескр для себя и вызываем ответ
  handleIncomingOffer = ({ description }) => {
    console.log('handleIncomingOffer', description);
    this.localPeer.setRemoteDescription(new RTCSessionDescription(description), () => {
      console.log('handleIncomingOffer setRemoteDescription', description);
      this.createAnswer();
    }, (e) => console.log(e));
  }

  // вызывается после handleIncomingOffer
  // p2 создаем ответ и устанавливаем ремоут дескр для себя
  // эмитим событие req:asnwer
  createAnswer = () => {
    console.log('createAnswer');
    this.localPeer.createAnswer((description) => {
      console.log('createAnswer', description);
      this.localPeer.setLocalDescription(description, () => {
        console.log('createAnswer setLocalDescription', description);
        const body = { conversationId: this.props.navigation.state.params.conversationId, description };
        this.socket.emit('req:answer', body);
      }, (e) => console.log(e));
    }, (e) => console.log(e));
  }

  // запускаем при res:answer
  // p1 пришел ответ, устанавливаем ремоут дескр для себя
  handleAnswer = ({ description }) => {
    console.log('handleAnswer', description);
    this.localPeer.setRemoteDescription(new RTCSessionDescription(description), () => {
      console.log('handleAnswer setRemoteDescription', description);
    }, (e) => console.log(e));
  }

  handleNewIceCandidate = ({ candidate }) => {
    console.log('handleNewIceCandidate', new RTCIceCandidate(candidate));
    this.localPeer.addIceCandidate(new RTCIceCandidate(candidate));
  }

  render() {
    const {
      localStream,
      remoteStream
    } = this.state;

    console.log('streams', localStream, remoteStream);

    return (
      <View style={s.container}>
        <View style={s.externalVideoContainer}>
          <RTCView objectFit="cover" style={s.externalVideo} streamURL={remoteStream && remoteStream.toURL()}/>
        </View>
        
        <View style={s.internalVideoContainer}>
          <RTCView objectFit="cover" style={s.internalVideo} streamURL={localStream && localStream.toURL()}/>
        </View>

        <View style={s.controls}>
          <View style={s.button}>
            <CallButton iconName="call-end" backgroundColor="#ff3b2f" iconColor="#fff"/>
          </View>
        </View>
      </View>
    );
  }
}


export default Call;

















// const PEERS = {};

// export default class Call extends Component {
//   constructor(props) {
//     super(props);

//     this.socket = null;
//     this.configuration = {'iceServers': [{ 'url': 'stun:stun.l.google.com:19302' }]};

//     this.state = {
//       peers: {},
//       externalStream: {},
//       internalStream: {}
//     };
//   }

//   async initSocket() {
//     this.socket = await socketService();
//   }

//   async componentDidMount() {
//     await this.initSocket();

//     this.getInternalStream(true, (stream) => this.setState({ internalStream: stream }));

//     this.socket.on('exchange', (data) => this.exchange(data));
//     // this.socket.on('connect', () => {
//     //   this.getInternalStream(true, (stream) => this.setState({ internalStream: stream }));
//     // });

//     console.log('join to call with ', this.props.navigation.state.params.conversationId);

//     this.join(this.props.navigation.state.params.conversationId);
//   }

//   componentWillUnmount() {
//     this.socket.off('exchange');
//     this.socket.off('connect');
//   }

//   join = (conversationId) => {
//     console.log('emit join', conversationId);
//     this.socket.emit('join', conversationId, (socketIds) => {
//       for (const index in socketIds) {
//         const socketId = socketIds[index];
//         this.createPeerConnection(socketId, true);
//       }
//     });
//   }

//   exchange = (data) => {
//     console.log('exchange happend', data);
//     // const peerConn = this.createPeerConnection(data.from, false);
//     let peerConnection;
//     if (data.from in PEERS) {
//       peerConnection = PEERS[data.from];
//     } else {
//       peerConnection = this.createPeerConnection(data.from, false);
//     }

//     if (data.sdp) {
//       peerConnection.setRemoteDescription(new RTCSessionDescription(data.sdp), () => {
//         if (peerConnection.remoteDescription.type === 'offer') {
//           peerConnection.createAnswer((description) => {
//             console.log('create answer', description);
//             peerConnection.setLocalDescription(description, () => {
//               console.log('set local description', peerConnection.localDescription);
//               this.socket.emit('exchange', { to: data.from, sdp: peerConnection.localDescription });
//             }, (e) => console.log(e));
//           }, (e) => console.log(e));
//         }
//       }, (e) => console.log(e));
//     } else {
//       console.log('exchange candidate', data);
//       peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
//     }
//   }

//   createPeerConnection = (peerId, isOffer) => {
//     const peerConnection = new RTCPeerConnection(this.configuration);

//     PEERS[peerId] = peerConnection;

//     const createOffer = () => {
//       peerConnection.createOffer((description) => {
//         console.log('create offer', description);
//         peerConnection.setLocalDescription(description, () => {
//           console.log('set local description', description);
//           this.socket.emit('exchange', { to: peerId, sdp: peerConnection.localDescription });
//         }, (e) => console.log(e));
//       }, (e) => console.log(e));
//     }

//     peerConnection.onaddstream = (event) => {
//       console.log(event);
//       this.setState({ externalStream: event.stream })
//     };
//     peerConnection.onnegotiationneeded = () => isOffer ? createOffer() : null;
//     peerConnection.addStream(this.state.internalStream);

//     return peerConnection;
//   }

//   getInternalStream = (isFrontSource, callback) => {
//     const options = {
//       audio: true,
//       video: {
//         facingMode: 'user',
//         mandatory: {
//           minWidth: Dimensions.get('window').width,
//           minHeight: Dimensions.get('window').height,
//           minFrameRate: 30
//         }
//       }
//     };

//     getUserMedia(options, (stream) => callback(stream), (e) => console.log(e));
//   }

//   render() {
//     const {
//       externalStream,
//       internalStream
//     } = this.state;

//     console.log('streams', externalStream, internalStream);

//     return (
//       <View style={s.container}>
//         <View style={s.externalVideoContainer}>
//           <RTCView objectFit="cover" style={s.externalVideo} streamURL={externalStream.toURL && externalStream.toURL()}/>
//         </View>
        
//         <View style={s.internalVideoContainer}>
//           <RTCView objectFit="cover" style={s.internalVideo} streamURL={internalStream.toURL && internalStream.toURL()}/>
//         </View>

//         <View style={s.controls}>
//           <View style={s.button}>
//             <CallButton iconName="call-end" backgroundColor="#ff3b2f" iconColor="#fff"/>
//           </View>
//         </View>
//       </View>
//     );
//   }
// }
