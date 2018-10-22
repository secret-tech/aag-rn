export default {
  profile: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20
  },

  settings: {
    position: 'absolute',
    top: 10,
    right: 20,
    padding: 0
  },

  pictureWrap: {
    width: 150,
    height: 150,
    backgroundColor: 'grey',
    borderRadius: 500,
    overflow: 'hidden',
    marginTop: 20,
    marginBottom: 20
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 500,
    overflow: 'hidden'
  },

  nameWrap: {
    marginBottom: 20
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold'
  },

  bioWrap: {
    marginBottom: 20
  },
  bio: {
    fontSize: 18
  },

  tagsWrap: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: -2.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tag: {
    fontSize: 14,
    color: '#000',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    borderRadius: 6,
    paddingTop: 3,
    paddingBottom: 4,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 2.5
  }
};
