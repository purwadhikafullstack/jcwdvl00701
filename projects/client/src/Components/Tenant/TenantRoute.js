import { Route, Redirect, useHistory } from "react-router-dom";
import Loading from "../Loading";
import { useSelector } from "react-redux";
import { onAuthStateChanged,getAuth } from "firebase/auth";
import { authFirebase } from "../../Config/firebase";
function TenantRoute(props) {
  const { TenantId, UserRoles } = useSelector((state) => state.user);
  // const auth = getAuth()
  //console.log(UserRoles);
  //console.log(TenantId);
  const history = useHistory();

  if (UserRoles[0] === undefined) {
    //console.log("kosong");

    onAuthStateChanged(authFirebase, (user) => {
      if (!user) {
        history.push("/tenant/login");
      }
    });
    return <Loading />;
  } else if (UserRoles.includes(2)) {
    return <Route {...props} />;
  } else {
    return history.push("/");
  }
}

export default TenantRoute;
