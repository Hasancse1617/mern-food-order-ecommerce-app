import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RouteLink = (props) => {
    const {user} = useSelector((state)=>state.AuthReducer);
    return user?( <Redirect to="/admin/dashboard" />) : (<Route path={props.path}  component={props.component} />);
}

export default RouteLink;