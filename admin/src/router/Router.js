import { useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router";
import ForgotPassword from "../components/auth/ForgotPassword";
import Login from "../components/auth/Login";
import ResetPassword from "../components/auth/ResetPassword";
import DashboardRoute from "./DashboardRoute";
import PrivateRoute from "./PrivateRoute";
import RouteLink from "./RouteLink";

const Router = () => {
    const { user } = useSelector((state)=>state.AuthReducer);
    return (
        <>
           <Switch>
                <Route exact path="/" 
                        render={()=>{
                            return (
                                user? <Redirect to="/admin/dashboard" /> : <Redirect to="/admin/login" />
                            )
                        }}>
                </Route>
               <RouteLink exact path="/admin/login" component={Login}></RouteLink>
               <RouteLink exact path="/admin/forgot-password" component={ForgotPassword}></RouteLink>
               <RouteLink exact path="/admin/reset-password/:token" component={ResetPassword}></RouteLink>
               <PrivateRoute path="/admin" component={DashboardRoute}></PrivateRoute>
           </Switch>
        </>
    );
}

export default Router;