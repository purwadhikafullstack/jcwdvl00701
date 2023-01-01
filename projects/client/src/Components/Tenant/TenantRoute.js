import { Route, Redirect, useHistory } from "react-router-dom";

import { useSelector } from "react-redux";

function TenantRoute(props) {
  const { TenantId, UserRoles } = useSelector((state) => state.user);
  console.log(UserRoles);
  const history = useHistory();

  if (!UserRoles === []) {
    console.log("LOADINGGG!!!!!");
  } else {
    if (UserRoles[1] === 2) {
      return <Route {...props} />;
    } else {
      alert("tes");
    }
  }
}

export default TenantRoute;
// import { connect } from "react-redux";
// import React from "react";
// import { Route, Redirect, useHistory } from "react-router-dom";
// import Home from "../../Pages/User/Home";
// class TenantRoute extends React.Component {
//   state = {
//     loading: false,
//     gurad: this.props.globalState.UserRoles,
//   };

//   render() {
//     if (this.props.globalState.UserRoles === []) {
//       console.log("LOADINGGG!!!!!");
//     } else {
//       if (this.props.globalState.UserRoles[1] === 2) {
//         return <Route {...this.props} />;
//       } else {
//         <Redirect to="/" />;
//       }
//     }
//   }

//   // render() {
//   //   return this.state.guard[1] === 2 ? (
//   //     <Route {...this.props} />
//   //   ) : (
//   //     <Redirect to="/" />
//   //   );
//   // }
// }

// const mapStateToProps = (state) => {
//   return {
//     globalState: state.user,
//   };
// };

// export default connect(mapStateToProps)(TenantRoute);
