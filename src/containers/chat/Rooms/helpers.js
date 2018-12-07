import { getUserId } from '../../../utils/auth';
import { isIterable } from 'core-js';

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
export const transformMessage = ({ id, message, timestamp, user, ...rest }) => {
  const transformedMessage = {
    _id: id,
    text: message,
    createdAt: new Date(timestamp),
    ...rest
  };

  if (user) transformedMessage.user = transformUser(user);

  return transformedMessage;
};

export const revTransformUser = ({ _id, name, avatar }) => ({
  id: _id,
  firstName: name,
  picture: avatar
});

export const revTransformMessage = ({ _id, text, createdAt, user, ...rest }) => {
  const transformedMessage = {
    id: _id,
    message: text,
    timestamp: Date.parse(createdAt),
    ...rest
  };

  if (user) transformedMessage.user = revTransformUser(user);

  return transformedMessage;
};