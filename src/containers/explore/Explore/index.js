import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Content } from 'native-base';

import PlatformMargin from '../../../components/common/PlatformMargin';
import Spinner from '../../../components/common/Spinner';
import ExplorerSection from '../../../components/explore/ExporerSection';

import { fetchAdvisors } from '../../../redux/ducks/explore/explore';


class Explore extends Component {
  componentWillMount() {
    this.props.fetchAdvisors();
  }

  render() {
    const { newAdvisors, featuredAdvisors, onlineAdvisors, loading } = this.props.explore.toJS();

    return loading
      ? <Spinner/>
      : (
        <Container>
          <Content>
            <PlatformMargin>
              <ExplorerSection title="Featured advisors" type="featured" data={featuredAdvisors}/>
              <ExplorerSection title="New advisors" type="new" data={newAdvisors}/>
              <ExplorerSection title="Online advisors" type="online" data={onlineAdvisors}/>
            </PlatformMargin>
          </Content>
        </Container>
      );
  }
}

export default connect(
  (state) => ({
    explore: state.explore.explore
  }), 
  {
    fetchAdvisors
  })(Explore);
