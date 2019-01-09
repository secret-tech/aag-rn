export default {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex'
  },

  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },
  dialer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)'
  },
  title: {
    paddingTop: 40
  },
  name: {
    fontSize: 36,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  call: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginTop: 10
  },

  externalVideoContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'blue'
  },
  externalVideo: {
    width: '100%',
    height: '100%',
    flex: 1
  },
  internalVideoContainer: {
    width: 90,
    height: 160,
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'red',
    zIndex: 2
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
