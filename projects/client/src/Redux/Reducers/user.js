import userTypes from "./Types/userTypes";

const init_state = {
  id : "",
  name : "",
  email : "",
  phone_number : "",
  gender: "",
  birthdate: "",
  profile_pic : "",
  is_verified: "",
  role : "",
  storageIsChecked : false,
  firebaseProviderId : "",
  roleId : [],
  tenantId : 0,
  Tenant: {}
};

export default (state = init_state, action) => {
  switch (action.type) {
    case userTypes.Login:
      console.log(...action.payload);
      return {...state,
        ...action.payload,
        id : action.payload.id,
        name : action.payload.name,
        email : action.payload.email,
        firebaseProviderId : action.payload.firebaseProviderId,
        Tenant : action.payload.Tenant
      };
    case userTypes.Register:
      return {...state,
        ...action.payload , 
        id : action.payload.id,
        name : action.payload.name,
        email : action.payload.email,
        firebaseProviderId : action.payload.firebaseProviderId,
      };
    case userTypes.Redux :
      return {...state,
      ...action.payload,
      id : action.payload.id,
      name : action.payload.name,
      email : action.payload.email,
      firebaseProviderId : action.payload.firebaseProviderId,
      roleId : action.payload.UserRoles,
      tenantId : action.payload.Tenant.id,
      is_verified : action.payload.emailVerified
      }
    default:
      return state;
  }
};
