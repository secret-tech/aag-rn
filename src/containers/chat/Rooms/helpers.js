import { getUserId } from '../../../utils/auth';

export const getAnotherUser = (users, userId) => 
  users.reduce((acc, user) => user.id !== userId ? user : acc, {});

export const getUser = (users, userId) =>
  users.reduce((acc, user) => user.id === userId ? user : acc, {});

export const sortConversations = (conversations) => 
  conversations.slice().sort((a, b) => b.lastMessage.timestamp - a.lastMessage.timestamp);

// transform user to gifted chat format
// see user prop
// https://github.com/FaridSafi/react-native-gifted-chat#props
export const transformUser = ({ id, firstName, picture }) => ({ 
  _id: id, 
  name: firstName, 
  avatar: picture 
});

// transform message to gifted chat format
// https://github.com/FaridSafi/react-native-gifted-chat#example
export const transformMessage = ({ id, message, timestamp, user }) => ({
  _id: id,
  text: message,
  createdAt: timestamp,
  user: transformUser(user)
});