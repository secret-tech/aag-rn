import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, View, Button, Icon, Text } from 'native-base';

import { fetchSubAdvisors, purgeSubAdvisors } from '../../../redux/ducks/explore/subExplore';

import SubExplorer from '../../../components/explore/SubExplorer';

import s from './styles';

class SubExplore extends Component {
  capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  componentWillMount() {
    const { type } = this.props.navigation.state.params;
    this.props.fetchSubAdvisors({ type, page: 1, limit: 100 });
  }

  componentWillUnmount() {
    this.props.purgeSubAdvisors();
  }

  render() {
    const { type } = this.props.navigation.state.params;
    const { loading, data } = this.props;

    return loading || (
      <Container>
        <View style={s.wrapper}>
          <View style={s.header}>
            <Button transparent style={s.back} onPress={() => this.props.navigation.goBack()}>
              <Icon type="SimpleLineIcons" name="arrow-left" style={{ fontSize: 20, color: '#000' }}/>
            </Button>

            <Text style={s.title}>{this.capitalize(`${type} advisors`)}</Text>
          </View>
          
          <SubExplorer data={data}/>
        </View>
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
