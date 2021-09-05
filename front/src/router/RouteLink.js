import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RouteLink = (props) => {
    const {user} = useSelector((state)=>state.UserReducer);
    return user?( <Redirect to="/" />) : (<Route path={props.path}  component={props.component} />);
}

export default RouteLink;