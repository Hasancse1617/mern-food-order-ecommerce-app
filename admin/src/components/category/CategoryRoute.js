import { Route, Switch, useRouteMatch } from "react-router-dom"
import AddCategory from "./AddCategory";
import Category from "./Category";
import EditCategory from "./EditCategory";

const CategoryRoute = () => {
    const { path } = useRouteMatch();
    return (
        <>
            <Switch>
                <Route exact path={`${path}/all`} component={Category}></Route>
                <Route exact path={`${path}/create`} component={AddCategory}></Route>
                <Route exact path={`${path}/edit/:id`} component={EditCategory}></Route>
            </Switch>
        </>
    );
}

export default CategoryRoute;