import React from 'react';
import { UserPreview } from './UserPreview';

export const UserList = ({ users, removeUser }) => {
  return (
    <div className='user-list'>
      {users.map((user) => (
        <UserPreview removeUser={removeUser} user={user} key={user._id} />
      ))}
    </div>
  );
};
