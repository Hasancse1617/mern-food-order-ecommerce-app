import React,{ Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Blog from './Blog';

class BlogRoute extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const { path } = this.props.match;

        return(
            <Switch>
                 <Route exact path={`${path}/all`} component={Blog}></Route>
            </Switch>
        )
    }
}
export default withRouter(BlogRoute);