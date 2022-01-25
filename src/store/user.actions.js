import { userService } from '../services/user.service.js';
import { showErrorMsg } from '../services/event-bus.service.js';

export function loadUsers() {
  return async (dispatch, getState) => {
    const { filterBy } = getState().userModule;
    console.log(filterBy);
    try {
      const users = await userService.query(filterBy);
      dispatch({ type: 'SET_USERS', users });
    } catch (err) {
      console.log(err);
    }
  };
}

export function removeUser(userId) {
  return async (dispatch) => {
    try {
      await userService.remove(userId);
      dispatch({ type: 'REMOVE_USER', userId });
    } catch (err) {
      console.log('UserActions: err in removeUser', err);
    }
  };
}

export function addUser(user) {
  return async (dispatch) => {
    try {
      await userService.save(user);
      dispatch({ type: 'ADD_USER', user });
    } catch (err) {
      console.log('UserActions: err in removeUser', err);
    }
  };
}

export function setFilterBy(filterBy) {
  return (dispatch) => {
    dispatch({ type: 'SET_FILTER_BY', filterBy });
  };
}
