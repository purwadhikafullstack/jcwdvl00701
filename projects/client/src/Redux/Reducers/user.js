import userTypes from "./Types/userTypes";

const init_state = {
  name : "",
  email : "",
  email : "",
  role : "",
  id : 0,
  profile_pic : "",
  storageIsChecked : false
};

export default (state = init_state, action) => {
  switch (action.type) {
    case userTypes.Login:
      return {...state, ...action.payload};

    default:
      return state;
  }
};
