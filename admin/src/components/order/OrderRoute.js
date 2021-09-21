import { Route, Switch, useRouteMatch } from "react-router-dom"
import Order from "./Order";
import OrderDetails from "./OrderDetails";
import OrderPDF from "./OrderPDF";

const OrderRoute = () => {
    const { path } = useRouteMatch();
    return (
        <>
            <Switch>
                <Route exact path={`${path}/all`} component={Order}></Route>
                <Route exact path={`${path}/details/:id`} component={OrderDetails}></Route>
                {/* <Route exact path={`${path}/order-pdf/:id`} component={OrderPDF}></Route> */}
            </Switch>
        </>
    );
}

export default OrderRoute;