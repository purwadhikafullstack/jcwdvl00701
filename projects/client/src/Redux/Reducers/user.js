import userTypes from "./Types/userTypes";

const init_state = {
  id : 0,
  name : "",
  email : "",
  phone_number : "",
  gender: "",
  birthdate: "",
  profile_pic : "",
  is_verified: "",
  role : "",
  storageIsChecked : false,
  firebaseProviderId : ""
};

export default (state = init_state, action) => {
  switch (action.type) {
    case userTypes.Login:
      return {...state,
        ...action.payload,
        id : action.payload.id,
        name : action.payload.name,
        email : action.payload.email,
        firebaseProviderId : action.payload.firebaseProviderId
      };
    case userTypes.Register:
      return {...state,
        ...action.payload , 
        id : action.payload.id,
        name : action.payload.name,
        email : action.payload.email,
        firebaseProviderId : action.payload.firebaseProviderId
      }
    default:
      return state;
  }
};
