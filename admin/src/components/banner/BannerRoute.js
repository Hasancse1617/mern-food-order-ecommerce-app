import { Route, Switch, useRouteMatch } from "react-router";
import AddBanner from "./AddBanner";
import Banner from "./Banner";
import EditBanner from "./EditBanner";

const BannerRoute = () => {
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={`${path}/all`} component={Banner}></Route>
            <Route exact path={`${path}/create`} component={AddBanner}></Route>
            <Route exact path={`${path}/edit/:id`} component={EditBanner}></Route>
        </Switch>
    );
}

export default BannerRoute;