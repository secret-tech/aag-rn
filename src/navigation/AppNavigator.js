import { connect } from 'react-redux';
import { createSwitchNavigator } from 'react-navigation';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers';

// import TabNavigator from './TabNavigator';
import Main from '../containers/common/Main';
import AuthNavigator from './AuthNavigator';
import AuthSpinner from '../containers/auth/AuthSpinner';

const AppNavigator = createSwitchNavigator({
  AuthSpinner,
  Home: Main,
  Auth: AuthNavigator
}, {
  initialRouteName: 'AuthSpinner',
  headerMode: 'none'
});

export const navReducer = createNavigationReducer(AppNavigator);
export const navMiddleware =
  createReactNavigationReduxMiddleware('root', (state) => state.nav);

const ReduxifiedAppNav = reduxifyNavigator(AppNavigator, 'root');
export default connect((state) => ({
  state: state.nav
}))(ReduxifiedAppNav);
