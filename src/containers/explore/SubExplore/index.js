import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content, View, Button, Icon, Text } from 'native-base';

import SubExplorer from '../../../components/explore/SubExplorer';

import s from './styles';

const ADVISORS = [
  { name: 'name 1' },
  { name: 'name 2' },
  { name: 'name 3' },
  { name: 'name 4' }
];

class SubExplore extends Component {
  capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  render() {
    const { type } = this.props.navigation.state.params;

    return (
      <Container>
        <Content>
          <View style={s.header}>
            <Button transparent style={s.back} onPress={() => this.props.navigation.goBack()}>
              <Icon type="SimpleLineIcons" name="arrow-left" style={{ fontSize: 20, color: '#000' }}/>
            </Button>

            <Text style={s.title}>{this.capitalize(`${type} advisors`)}</Text>
          </View>
          
          <SubExplorer advisors={ADVISORS}/>
        </Content>
      </Container>
    );
  }
}

export default connect(null, null)(SubExplore);
