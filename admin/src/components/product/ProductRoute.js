import { Route, Switch, useRouteMatch } from "react-router-dom"
import AddProduct from "./AddProduct";
import Product from "./Product";
import EditProduct from "./EditProduct";
import AddImages from "./AddImages";
import AddAttributes from "./AddAttributes";


const ProductRoute = () => {
    const { path } = useRouteMatch();
    return (
        <>
            <Switch>
                <Route exact path={`${path}/all`} component={Product}></Route>
                <Route exact path={`${path}/create`} component={AddProduct}></Route>
                <Route exact path={`${path}/edit/:id`} component={EditProduct}></Route>
                <Route exact path={`${path}/images/:id`} component={AddImages}></Route>
                <Route exact path={`${path}/attribute/:id`} component={AddAttributes}></Route>
            </Switch>
        </>
    );
}

export default ProductRoute;