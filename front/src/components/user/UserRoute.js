import { Route, Switch, useRouteMatch } from "react-router-dom";
import Activation from "./Activation";
import Login from "./Login";
import Register from "./Register";

const UserRoute = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
                <Route exact path={`${path}/login`} component={Login}></Route>
                <Route exact path={`${path}/register`} component={Register}></Route>
                <Route exact path={`${path}/verify-account/:token`} component={Activation}></Route>
        </Switch>
    );
}

export default UserRoute;