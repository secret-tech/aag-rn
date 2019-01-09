import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
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

    return loading
      ? <Spinner/>
      : (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
          <Container>
            <Content>
              <ExplorerSection title="Featured advisors" type="featured" data={featuredAdvisors}/>
              <ExplorerSection title="New advisors" type="new" data={newAdvisors}/>
              <ExplorerSection title="Online advisors" type="online" data={onlineAdvisors}/>
            </Content>
          </Container>
        </SafeAreaView>
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
