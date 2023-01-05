import { Route, Redirect, useHistory } from "react-router-dom";
import Loading from "../Loading";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { authFirebase } from "../../Config/firebase";
function TenantRoute(props) {
  const { TenantId, UserRoles } = useSelector((state) => state.user);
  console.log(UserRoles);
  console.log(TenantId);
  const history = useHistory();

  if (UserRoles[0] === undefined) {
    console.log("kosong");

    onAuthStateChanged(authFirebase, (user) => {
      if (!user) {
        history.push("/");
      }
    });
    return <Loading />;
  } else if (UserRoles[1] === 2) {
    return <Route {...props} />;
  } else {
    return history.push("/");
  }
}

export default TenantRoute;

// import { connect } from "react-redux";
// import React from "react";
// import { Route, Redirect, withRouter } from "react-router-dom";
// import { Spinner } from "@chakra-ui/react";
// import { compose } from "redux";
// class TenantRoute extends React.Component {
//   state = {
//     loading: false,
//     gurad: this.props.globalState.UserRoles,
//   };

// render() {
//   if (!this.state.gurad === []) {
//     console.log(this.state.gurad);
//     alert("tesa");
//   } else {
//     if (this.state.gurad[1] === 2) {
//       console.log(this.state.gurad);
//       return <Route {...this.props} />;
//     } else if (this.state.gurad.length === 1) {
//       alert("tesa 2");
//     } else {
//       console.log(this.state.gurad);
//     }
//   }
// }

// render() {
//   return this.state.guard[1] === 2 ? (
//     <Route {...this.props} />
//   ) : (
//     <Redirect to="/" />
//   );
// }

//   render() {
//     if (this.state.gurad[0] === undefined) {
//       console.log("kosong");
//       return <Spinner color="blue.500" />;
//     } else if (this.state.gurad[1] === 2) {
//       return <Route {...this.props} />;
//     } else {
//       return <div>dia bukan tenant</div>;
//     }
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     globalState: state.user,
//   };
// };

// export default connect(mapStateToProps)(TenantRoute);
