import { Route, Switch, useRouteMatch } from "react-router-dom"
import AddUser from "./AddUser";
import AllUser from "./AllUser";
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
            </Switch>
        </>
    );
}

export default UserRoute;