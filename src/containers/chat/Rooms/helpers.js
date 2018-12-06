import { getUserId } from '../../../utils/auth';

export const getAnotherUser = (users, userId) => 
  users.reduce((acc, user) => user.id !== userId ? user : acc, {});

export const sortConversations = (conversations) => 
  conversations.slice().sort((a, b) => a.lastMessage.timestamp - b.lastMessage.timestamp);