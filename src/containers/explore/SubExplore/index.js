import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Left, Body, Right, Title, Button, Icon, Text } from 'native-base';

import { fetchSubAdvisors, purgeSubAdvisors } from '../../../redux/ducks/explore/subExplore';

import SubExplorer from '../../../components/explore/SubExplorer';
import Spinner from '../../../components/common/Spinner';

import s from './styles';

class SubExplore extends Component {
  capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  componentWillMount() {
    const { type } = this.props.navigation.state.params;
    this.props.fetchSubAdvisors({ type, page: 1, limit: 10 });
  }

  componentWillUnmount() {
    this.props.purgeSubAdvisors();
  }

  render() {
    const { type } = this.props.navigation.state.params;
    const { loading, data } = this.props;

    return loading
      ? <Spinner/>
      : (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
              <Text>Back</Text>
            </Button>
          </Left>
          <Body>
            <Title>{this.capitalize(`${type} advisors`)}</Title>
          </Body>
          <Right/>
        </Header>

        <SubExplorer data={data}/>
      </Container>
    );
  }
}

export default connect(
  (state) => ({
    data: state.explore.subExplore.data,
    loading: state.explore.subExplore.loading
  }), 
  {
    fetchSubAdvisors,
    purgeSubAdvisors
  })(SubExplore);
