import { Route, Switch, useRouteMatch } from "react-router-dom"
import Cart from "./Cart";
import Shop from "./Shop";
import ShopSingle from "./ShopSingle";

const ShopRoute = () => {
    const { path } = useRouteMatch();
    return (
        <>
            <Switch>
                  <Route path={`${path}/category/:url`} component={Shop}></Route>
                  <Route path={`${path}/single/:code`} component={ShopSingle}></Route>
                  <Route path={`${path}/cart`} component={Cart}></Route>
            </Switch>
        </>
    );
}

export default ShopRoute;