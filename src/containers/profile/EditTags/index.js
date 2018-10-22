import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dimensions } from 'react-native';
import { Container, Header, Left, Button, Icon, Text, Body, Title, Right, View, Content } from 'native-base';
import TagInput from 'react-native-tag-input';

import { updateTags } from '../../../redux/ducks/profile/editTags';

import s from './styles';

class EditTags extends Component {
  state = {
    tags: this.props.tags.toJS() || [],
    text: ''
  }

  addTag = (text) => {
    this.setState({ text });

    const lastTyped = text.charAt(text.length - 1);
    const parseWhen = [',', '.', '  '];

    if (parseWhen.indexOf(lastTyped) > -1) {
      const tags = [...this.state.tags, this.state.text];
      this.setState({ tags, text: '' });
    }
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back'/>
              <Text>Back</Text>
            </Button>
          </Left>
          <Body>
            <Title>Edit interests</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.props.updateTags(this.state.tags)}>
              <Text>Save</Text>
            </Button>
          </Right>
        </Header>
        <Content>
        <View style={s.wrapper}>
          <TagInput
            value={this.state.tags}
            onChange={(tags) => this.setState({ tags })}
            labelExtractor={(label) => label}
            text={this.state.text}
            onChangeText={this.addTag}
            maxHeight={Dimensions.get('window').height}
            tagContainerStyle={{
              paddingTop: 3,
              paddingBottom: 4,
              paddingLeft: 10,
              paddingRight: 10,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              borderRadius: 6,
              margin: 2.5
            }}
            tagTextStyle={{
              color: '#000',
              fontSize: 14
            }}
            inputProps={{
              keyboardType: 'default',
              returnKeyType: 'join',
              placeholder: 'Enter interest',
              style: {
                fontSize: 14,
                paddingTop: 9,
                paddingBottom: 10
              },
            }}/>
          </View>
        </Content>
      </Container>
    );
  }
}

export default connect(
  (state) => ({
    tags: state.profile.profile.get('tags')
  }), 
  {
    updateTags
  }
)(EditTags);
