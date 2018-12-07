export default {
  main: {
    width: '100%',
    height: '100%',
    display: 'flex'
  },
  externalVideoContainer: {
    width: '100%',
    height: '100%',
    alignSelf: 'stretch',
    flex: 1,
    backgroundColor: 'blue'
  },
  externalVideo: {
    width: '100%',
    height: '100%',
    flex: 1,
    backgroundColor: 'red'
  },
  internalVideoContainer: {
    width: 90,
    height: 160,
    position: 'absolute',
    top: 20,
    right: 20
  },
  internalVideo: {
    flex: 1
  },
  controls: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingBottom: 20
  },
  button: {
    padding: 30
  }
};
