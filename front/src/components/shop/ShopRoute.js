import { Route, Switch, useRouteMatch } from "react-router-dom"
import PrivateRoute from "../../router/PrivateRoute";
import Cancel from "./Cancel";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Shop from "./Shop";
import ShopSingle from "./ShopSingle";
import Thanks from "./Thanks";
import Wishlist from "./Wishlist";

const ShopRoute = () => {
    const { path } = useRouteMatch();
    return (
        <>
            <Switch>
                  <Route path={`${path}/category/:url`} component={Shop}></Route>
                  <Route path={`${path}/single/:code`} component={ShopSingle}></Route>
                  <PrivateRoute path={`${path}/cart`} component={Cart}></PrivateRoute>
                  <PrivateRoute path={`${path}/wishlist/:id`} component={Wishlist}></PrivateRoute>
                  <PrivateRoute path={`${path}/checkout`} component={Checkout}></PrivateRoute>
                  <PrivateRoute path={`${path}/thanks`} component={Thanks}></PrivateRoute>
                  <PrivateRoute path={`${path}/cancel`} component={Cancel}></PrivateRoute>
            </Switch>
        </>
    );
}

export default ShopRoute;