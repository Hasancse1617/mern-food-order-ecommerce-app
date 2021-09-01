import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = (props) => {
    const {user} = useSelector((state)=>state.AuthReducer);
    return user?( <Route path={props.path} component={props.component} />) : (<Redirect to="/admin/login" />);
}

export default PrivateRoute;