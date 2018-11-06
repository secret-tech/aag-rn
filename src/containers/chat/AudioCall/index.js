import React, { Component } from 'react';
import { View, Text, Button } from 'native-base';
import { Voximplant } from 'react-native-voximplant';


class AudioCall extends Component {
  componentWillMount() {
    this.vox = Voximplant.getInstance({
      enableVideo: true,
      saveLogsToFile: true // TODO LOGS
    });
  }

  login = async () => {
    try {
      const state = await this.vox.getClientState();
      if (state === Voximplant.ClientState.DISCONNECTED) {
        await this.vox.connect();
      }

      const authResult = await this.vox.login('test1@askagirl.oidrr.voximplant.com', '12345678');
      console.log('vox login result', authResult);
    } catch (e) {
      console.warn('vox login error', e);
    }
  }

  render() {
    return (
      <View>
        <Text>Audio call</Text>

        <Button onPress={this.login}>
          <Text>log in vox</Text>
        </Button>
      </View>
    );
  }
}

export default AudioCall;