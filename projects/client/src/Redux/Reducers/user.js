import userTypes from "./Types/userTypes";

const init_state = {};

export default (state = init_state, action) => {
  switch (action.type) {
    case userTypes.Login:
      return {};

    default:
      return state;
  }
};
