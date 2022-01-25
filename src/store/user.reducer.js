const initialState = {
  users: [],
  filterBy: null,
};
export function userReducer(state = initialState, action) {
  var newState = state;
  switch (action.type) {
    case 'SET_USERS':
      newState = { ...state, users: action.users };
      break;
    case 'REMOVE_USER':
      newState = {
        ...state,
        users: state.users.filter((user) => user._id !== action.userId),
      };
      break;
    case 'ADD_USER':
      newState = {
        ...state,
        users: [...state.users, action.user],
      };
      break;
    case 'SET_FILTER_BY':
      return {
        ...state,
        filterBy: action.filterBy,
      };
  }

  return newState;
}
