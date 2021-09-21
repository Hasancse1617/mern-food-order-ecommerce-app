import { Route, Switch, useRouteMatch } from "react-router-dom"
import AddRole from "./AddRole";
import AddUser from "./AddUser";
import AllUser from "./AllUser";
import EditRole from "./EditRole";
import Roles from "./Roles";
import UpdatePassword from "./UpdatePassword";
import UpdateProfile from "./UpdateProfile";


const UserRoute = () => {
    const { path } = useRouteMatch();
    return (
        <>
            <Switch>
                <Route exact path={`${path}/all`} component={AllUser}></Route>
                <Route exact path={`${path}/create`} component={AddUser}></Route>
                <Route exact path={`${path}/update-profile/:id`} component={UpdateProfile}></Route>
                <Route exact path={`${path}/update-password/:id`} component={UpdatePassword}></Route>
                <Route exact path={`${path}/roles-permission`} component={Roles}></Route>
                <Route exact path={`${path}/add-role-permission`} component={AddRole}></Route>
                <Route exact path={`${path}/edit-role-permission/:id`} component={EditRole}></Route>
            </Switch>
        </>
    );
}

export default UserRoute;