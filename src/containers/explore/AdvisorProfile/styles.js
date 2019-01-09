import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  },
  picture: {
    height: '100%',
    width: '100%',
    position: 'relative',
    zIndex: -1
  },
  pictureFrontdrop: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.05)'
  },

  dotStyle: {
    width: 8,
    height: 8,
    backgroundColor: '#fff'
  },

  back: {
    position: 'absolute',
    top: 10,
    zIndex: 1
  },
  connect: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    bottom: -32,
    backgroundColor: '#6546fa',
    borderRadius: 150,
    padding: 0,
    margin: 0,
    width: 64,
    height: 64
  },

  paginationWrapper: {
    position: 'absolute',
    bottom: 0
  },

  info: {
    paddingTop: 10,
    paddingHorizontal: 20
  },

  name: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000'
  },
  gender: {
    marginTop: 5,
    fontSize: 16,
    color: '#000'
  },
  ratioWrap: {
    marginTop: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  ratio: {
    color: '#000',
    fontSize: 16,
    marginLeft: 5
  },

  bioWrap: {
    paddingHorizontal: 20,
    marginTop: 10
  },
  bio: {
    fontSize: 16,
    lineHeight: 24,
    color: '#000'
  },

  tags: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: -2.5,
    alignItems: 'center'
  },
  tag: {
    fontSize: 14,
    color: '#000',
    backgroundColor: '#e5e5e5',
    overflow: 'hidden',
    borderRadius: 6,
    paddingTop: 3,
    paddingBottom: 4,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 2.5
  }
});
