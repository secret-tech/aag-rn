import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BackHandler } from 'react-native';
import { NavigationActions } from 'react-navigation';


const withBackHandler = (WrappedComponent) => {
  const Wrapper = () => (
    class extends Component {
      constructor (props) {
        super(props);
        this.onBackPress = this.onBackPress.bind(this);
      }
    
      componentDidMount () {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
      }
    
      componentWillUnmount () {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
      }
    
      onBackPress () {
        const { dispatch, nav } = this.props;
        dispatch(NavigationActions.back());
        return nav !== this.props.nav;
      }

      render () {
        return <WrappedComponent {...this.props}/>;
      }
    }
  )

  return connect((state) => ({ nav: state.nav }))(Wrapper());
}


export default withBackHandler;
