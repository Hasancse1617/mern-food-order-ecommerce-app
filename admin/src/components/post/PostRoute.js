import React,{ Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import AddPost from "./AddPost";
import EditPost from "./EditPost";
import Post from './Post';

class PostRoute extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const { path } = this.props.match;

        return(
            <Switch>
                 <Route exact path={`${path}/all`} component={Post}></Route>
                 <Route exact path={`${path}/create`} component={AddPost}></Route>
                 <Route exact path={`${path}/edit/:id`} component={EditPost}></Route>
            </Switch>
        )
    }
}
export default withRouter(PostRoute);