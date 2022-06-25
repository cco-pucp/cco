import * as actionsTypes from "../actions/actionsType";

const InitialState = {
  user: {},
};

const userReducer = (state = InitialState, action) => {
  switch (action.type) {
    case actionsTypes.LOGIN:
      return {
        user: action.user,
      };
    default:
      return state;
  }
};

export default userReducer;