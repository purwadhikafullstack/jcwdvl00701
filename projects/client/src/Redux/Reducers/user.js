import userTypes from "./Types/userTypes";

const init_state = {
  id: "",
  email: "",
  emailVerified: "",
  firebaseProviderId: "",
  UserRoles: [],
  TenantId: 0,
  TenantName: "",
  ProfileName: "",
  ProfilePic: "",
};

export default (state = init_state, action) => {
  switch (action.type) {
    case userTypes.Redux:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
