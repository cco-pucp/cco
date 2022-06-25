import * as actionTypes from "./actionsType";

export const login = (user) => {
  return {
    type: actionTypes.LOGIN,
    user: user,
  };
};