import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Header, Left, Body, Right, Title, Button, Icon, Text } from 'native-base';

import { fetchSubAdvisors, purgeSubAdvisors } from '../../../redux/ducks/explore/subExplore';

import SubExplorer from '../../../components/explore/SubExplorer';

class SubExplore extends Component {
  constructor(props) {
    super(props);

    this.type = this.props.navigation.state.params.type;

    this.state = {
      page: 1,
      limit: 5
    };
  }

  capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  componentWillMount() {
    this.props.fetchSubAdvisors({ type: this.type, ...this.state });
  }

  componentWillUnmount() {
    this.props.purgeSubAdvisors();
  }

  fetchMoreAdvisors = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1
    }), () => this.props.fetchSubAdvisors({ type: this.type, ...this.state }));
  }

  render() {
    const { data } = this.props;

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
              <Text>Back</Text>
            </Button>
          </Left>
          <Body>
            <Title>{this.capitalize(`${this.type} advisors`)}</Title>
          </Body>
          <Right/>
        </Header>

        <SubExplorer data={data} fetchMoreAdvisors={this.fetchMoreAdvisors}/>
      </Container>
    );
  }
}

export default connect(
  (state) => ({
    data: state.explore.subExplore.data
  }), 
  {
    fetchSubAdvisors,
    purgeSubAdvisors
  })(SubExplore);
