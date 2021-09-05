import { Route, Switch, useRouteMatch } from "react-router-dom"
import Post from "./Post";
import SinglePost from "./SinglePost";

const PostRoute = () => {
    const { path } = useRouteMatch();
    return (
        <>
            <Switch>
                  <Route exact path={`${path}/:url?`} component={Post}></Route>
                  <Route exact path={`${path}/single/:url`} component={SinglePost}></Route>
            </Switch>
        </>
    );
}

export default PostRoute;