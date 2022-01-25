import { connect, useDispatch, useSelector } from 'react-redux';
import { Component, useCallback, useEffect, useState } from 'react';
import { UserList } from '../cmps/UserList';
import { Link } from 'react-router-dom';
import { loadUsers, removeUser, setFilterBy } from '../store/user.actions';
import { UserFilter } from '../cmps/UserFilter';
export const UsersApp = (props) => {
  const { users } = useSelector((state) => state.userModule);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  const onRemoveUser = useCallback(async (userId) => {
    dispatch(removeUser(userId));
  }, []);

  const onChangeFilter = (filterBy) => {
    dispatch(setFilterBy(filterBy));
    dispatch(loadUsers());
  };

  if (!users) return <div>Loading...</div>;
  return (
    <div className='users-app'>
      <UserFilter onChangeFilter={onChangeFilter} />
      <UserList users={users} removeUser={onRemoveUser} />
      <Link to={'/user/edit'} className='add-user-btn'>
        Add User
      </Link>
    </div>
  );
};
