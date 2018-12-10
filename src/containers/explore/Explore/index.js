import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';

import Spinner from '../../../components/common/Spinner';
import ExplorerSection from '../../../components/explore/ExporerSection';

import { fetchAdvisors } from '../../../redux/ducks/explore/explore';


class Explore extends Component {
  componentWillMount() {
    this.props.fetchAdvisors();
  }

  render() {
    const { newAdvisors, featuredAdvisors, onlineAdvisors, loading } = this.props.explore.toJS();
    const { role } = this.props.profile.toJS();

    const getLabel = (type, role) => `${type} ${role === 'advisor' ? 'users' : 'advisors'}`;

    return loading
      ? <Spinner/>
      : (
        <Container>
          <Content>
            <ExplorerSection title={getLabel('Featured', role)} type="featured" data={featuredAdvisors}/>
            <ExplorerSection title={getLabel('New', role)} type="new" data={newAdvisors}/>
            <ExplorerSection title={getLabel('Online', role)} type="online" data={onlineAdvisors}/>
          </Content>
        </Container>
      );
  }
}

export default connect(
  (state) => ({
    explore: state.explore.explore,
    profile: state.profile.profile
  }), 
  {
    fetchAdvisors
  })(Explore);
