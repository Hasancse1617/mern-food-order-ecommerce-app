import { Route, Switch, useRouteMatch } from "react-router-dom"
import AddCoupon from "./AddCoupon";
import Coupon from "./Coupon";
import EditCoupon from "./EditCoupon";

const CouponRoute = () => {
    const { path } = useRouteMatch();
    return (
        <>
            <Switch>
                <Route exact path={`${path}/all`} component={Coupon}></Route>
                <Route exact path={`${path}/create`} component={AddCoupon}></Route>
                <Route exact path={`${path}/edit/:id`} component={EditCoupon}></Route>
            </Switch>
        </>
    );
}

export default CouponRoute;