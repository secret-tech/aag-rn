import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Left, Button, Icon, Text, Body, Title, Right, View, Content, Textarea } from 'native-base';

import { updateBio } from '../../../redux/ducks/profile/editBio';

import s from './styles';

class EditBio extends Component {
  state = {
    bio: this.props.bio || ''
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back' />
              <Text>Back</Text>
            </Button>
          </Left>
          <Body>
            <Title>Edit bio</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.props.updateBio(this.state.bio)}>
              <Text>Save</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <View style={s.wrapper}>
            <Textarea
              rowSpan={10}
              bordered
              style={s.textarea}
              value={this.state.bio}
              onChangeText={(bio) => this.setState({ bio })}
              placeholder={this.props.bio || 'Few words about you...'}/>
          </View>
        </Content>
      </Container>
    );
  }
}

export default connect(
  (state) => ({
    bio: state.profile.profile.get('bio')
  }),
  {
    updateBio
  }
)(EditBio);
