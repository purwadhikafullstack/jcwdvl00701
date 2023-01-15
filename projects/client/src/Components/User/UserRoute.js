import { Route, Redirect, useHistory } from "react-router-dom";
import Loading from "../Loading";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { authFirebase } from "../../Config/firebase";
function UserRoute(props) {
  const { TenantId, UserRoles } = useSelector((state) => state.user);
  //console.log(UserRoles);
  //console.log(TenantId);
  const history = useHistory();

  if (UserRoles[0] === undefined) {
    //console.log("kosong");

    onAuthStateChanged(authFirebase, (user) => {
      if (!user) {
        history.push("/");
      }
    });
    return <Loading />;
  } else if (UserRoles.includes(1)) {
    return <Route {...props} />;
  } else {
    return history.push("/");
  }
}

export default UserRoute;
