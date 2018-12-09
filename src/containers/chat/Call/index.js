// All comments in russian language coz I'm too lazy to rewrite them. Enjoy :-)

// Оставь надежду, всяк сюда входящий.
// Подумай 10 раз, перед тем, как что-то менять в этом проклятом файле. Тут тебе не рады.
// Тут используется deprecated webrtc DOM API потому что пакет react-native-webrtc еще не поддерживает актуальную версию.
// Для понимания какого хуя здесь происходит - советую прочитать документацию WEBRTC на mdn полностью
// https://developer.mozilla.org/ru/docs/Web/API/WebRTC_API

import React, { Component } from 'react';
import { Dimensions, Image } from 'react-native';
import { View, Button, Text } from 'native-base';
import { NavigationActions } from 'react-navigation';
import io from 'socket.io-client';
import { RTCPeerConnection, RTCMediaStream, RTCIceCandidate, RTCSessionDescription, RTCView, MediaStreamTrack, getUserMedia } from 'react-native-webrtc';

import CallButton from '../../../components/chat/CallButton';

import socketService from '../../../utils/socketService';

import s from './styles';

// Конфигурация локальных медиа данных
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

// Устаревшие опции для создания offer. По-умолчанию они являются true, а тут находятся на всякий случай
const OFFER_OPTIONS = {
  offerToReceiveAudio: true,
  offerToReceiveVideo: true
};


class Call extends Component {
  constructor(props) {
    super(props);

    this.configuration = {'iceServers': [{ 'url': 'stun:stun.l.google.com:19302' }]};

    this.localPeer = null;

    this.state = {
      localStream: null,
      remoteStream: null
    };
  }

  async componentWillMount() {
    // 1 Создаем RTC Peer Connection
    this.localPeer = new RTCPeerConnection(this.configuration);

    // 2 Handle ICE candidates and sync that shit between peers via socket
    this.localPeer.onicecandidate = ({ candidate }) => {
      const body = { conversationId: this.props.navigation.state.params.conversationId, candidate };
      if (candidate) this.socket.emit('req:ice', body);
    };

    // Create local stream (video, audio)
    await getUserMedia(
      LOCAL_STREAM_OPTIONS, 
      (stream) => this.setState({ localStream: stream }), 
      (e) => console.log(e)
    );

    // Add localStream to localPeer
    this.localPeer.addStream(this.state.localStream);

    // Init socket client and they handlers
    await this.initSocket();

    // Handle adding stream and put them into the state
    this.localPeer.onaddstream = (event) => {
      this.setState({ remoteStream: event.stream });
    };
  }

  componentWillUnmount() {
    // Removing socket handlers
    this.socket.off('res:uCaller');
    this.socket.off('res:offer');
    this.socket.off('res:answer');
    this.socket.off('res:ice');
    this.socket.off('res:hangup');
  }

  async initSocket() {
    // Create socket instance
    this.socket = await socketService();

    // Do what the server say
    // Сервер определяет кто является caller и присылает этот ивент клиенту caller
    this.socket.on('res:uCaller', this.createOffer);

    // После того, как caller выполнил req:offer, callee получит событие res:offer
    this.socket.on('res:offer', this.handleIncomingOffer);

    // После того, как callee принял description присылаем событие caller-у 
    this.socket.on('res:answer', this.handleAnswer);

    // Синхронизируем ICE сервера между клиентами
    this.socket.on('res:ice', this.handleNewIceCandidate);

    // Слушать отключение внешнего пира
    this.socket.on('res:hangup', this.handleResHangup);

    // Сказать серверу, что клиент готов принимать всякое
    this.socket.emit('req:imReady', this.props.navigation.state.params.conversationId);
  }

  // Запускается при сокет событии res:uCaller
  // [CALLER] создает offer и устанавливает description
  // При успехе всей цепи порождает событие req:offer
  createOffer = () => {
    this.localPeer.createOffer((description) => {
      this.localPeer.setLocalDescription(description, () => {
        const body = { conversationId: this.props.navigation.state.params.conversationId, description };
        this.socket.emit('req:offer', body);
      }, (e) => console.log(e));
    }, (e) => console.log(e), OFFER_OPTIONS);
  }

  // Запускается при сокет событии res:offer
  // [CALLEE] устанавливает description и вызывает следующую функцию
  handleIncomingOffer = ({ description }) => {
    this.localPeer.setRemoteDescription(new RTCSessionDescription(description), () => {
      this.createAnswer();
    }, (e) => console.log(e));
  }

  // [CALLEE] создает answer description, устанавливает его для себя и передает другому пиру
  // При успехе порождает событие req:asnwer
  createAnswer = () => {
    this.localPeer.createAnswer((description) => {
      this.localPeer.setLocalDescription(description, () => {
        const body = { conversationId: this.props.navigation.state.params.conversationId, description };
        this.socket.emit('req:answer', body);
      }, (e) => console.log(e));
    }, (e) => console.log(e));
  }

  // Запускается при сокет событии res:answer
  // [CALLER] получает ответ от callee и устанавливает description
  handleAnswer = ({ description }) => {
    // не трогать аргументы!!! Почему-то без них не совсем работает, я хз
    this.localPeer.setRemoteDescription(new RTCSessionDescription(description), () => {}, (e) => console.log(e));
  }

  // Запускается при сокет событии res:ice
  // Любой клиент получает нового ICE кандидата и устанавливает его в RTCPC
  handleNewIceCandidate = ({ candidate }) => {
    this.localPeer.addIceCandidate(new RTCIceCandidate(candidate));
  }

  // on socket res:hangup event
  handleResHangup = () => {
    this.props.navigation.navigate('ChatRooms');
    this.localPeer.close();
  }

  // on hangup button click
  handleHangup = () => {
    // Сказать пока серверу чтобы уведомить о выходе другого пира
    this.socket.emit('req:hangup', this.props.navigation.state.params.conversationId);
    this.props.navigation.navigate('ChatRooms');
    this.localPeer.close();
  }

  render() {
    const {
      localStream,
      remoteStream
    } = this.state;

    return (
      <View style={s.container}>
        <View style={s.externalVideoContainer}>
          <RTCView 
            objectFit="cover" 
            style={s.externalVideo} 
            streamURL={remoteStream && remoteStream.toURL()}/>
        </View>
        
        <View style={s.internalVideoContainer}>
          <RTCView 
            objectFit="cover" 
            style={s.internalVideo} 
            streamURL={localStream && localStream.toURL()}/>
        </View>

        <View style={s.controls}>
          <View style={s.button}>
            <CallButton
              onPress={this.handleHangup}
              iconName="call-end" 
              backgroundColor="#ff3b2f" 
              iconColor="#fff"/>
          </View>
        </View>
      </View>
    );
  }
}


export default Call;
