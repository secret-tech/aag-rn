// stable
import { Dimensions, Platform } from 'react-native';

const dwidth = Dimensions.get('window').width;
const lwidth = Dimensions.get('window').height;

export default {
  container: {
    backgroundColor: '#6546fa',
    flex: 1,
    flexDirection: 'column'
  },
  loginView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 0 : 15
  },
  logo: {
    width: 153,
    height: 91,
    alignSelf: 'center',
    marginBottom: 60,
    marginTop: 100
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: dwidth,
    height: lwidth
  },
  buttons: {
    marginBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%'
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    width: '100%'
  }
};
