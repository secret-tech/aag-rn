import React, { Component } from 'react';

import Spinner from '../../../components/common/Spinner';

import { getToken } from '../../../utils/auth';

class AuthSpinner extends Component {
  constructor(props) {
    super(props);
    this.checkJWT();
  }

  checkJWT = async () => {
    const jwt = await getToken();
    this.props.navigation.navigate(jwt ? 'Home' : 'Auth');
  };

  render() {
    return <Spinner/>;
  }
}

export default AuthSpinner;