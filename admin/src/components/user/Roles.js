import { useEffect } from "react";
import { Helmet } from "react-helmet";
import toast, {Toaster} from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchRole } from "../../store/actions/UserAction";
import { REMOVE_PERMISSIONS, REMOVE_USER_MESSAGE, REMOVE_USER_REDIRECT } from "../../store/types/UserType";
import Loader from "../loader/Loader";

const Roles = () => {
    const dispatch = useDispatch();
    const { roles, loading, message, rolePermissions } = useSelector((state)=>state.UserReducer);
    useEffect(()=>{
        dispatch(fetchRole());
        dispatch({type: REMOVE_PERMISSIONS});
    },[]);
    useEffect(()=>{
      if(message){
        toast.success(message);
        dispatch({type: REMOVE_USER_MESSAGE});
        dispatch({type: REMOVE_USER_REDIRECT});
        dispatch(fetchRole());
      }
    },[message]);
    return (
        <div class="content-wrapper">
        <Helmet>
            <title>Roles - Ecom website</title>
            <meta name="description" content="User Login Here" />
        </Helmet>
        <Toaster position="top-right" reverseOrder={false}/>
        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h4 className="float-left">All Roles</h4>
                    <h3><NavLink exact to="/admin/user/add-role-permission"><button type="button" class="btn btn-primary float-right text-bold">Add Role</button></NavLink></h3>
                  </div>
                  <div class="card-body">
                    <table id="example2" class="table table-bordered table-hover">
                      <thead>
                      <tr>
                        <th>ID.</th>
                        <th>Role Name</th>
                        <th className="text-center">Permissions</th>
                        <th>Action</th>
                      </tr>
                      </thead>
                      <tbody>
                    {
                      !loading?
                        roles.length > 0 ?
                        roles.map((role,index)=>(
                          <tr key={role._id}>
                            <td>{ role._id }</td>
                            <td>{ role.name }</td>
                            <td style={{display:"block", textAlign:"center"}}>
                              {rolePermissions[index].permission_id.map((permission)=>(
                                <>&nbsp;<span className="badge badge-success">{ permission.name }</span></>
                              ))}
                            </td>
                            <td>
                                <NavLink title="Edit Role Permission" exact to={`/admin/user/edit-role-permission/${role._id}`} ><button className="text-success" ><i className="fas fa-edit"></i></button></NavLink>
                            </td>
                        </tr>
                        ))
                        :'No Roles found'
                      :(<Loader/>)
                    }
                      </tbody>
                    </table>
                    
                  </div>
                </div>
                </div>
              </div>
            </div>
           {/* {!loading ? <Pagination page={page} perPage={perPage} count={count} pageLink={pageLink} /> : ''} */}
        </section>
        </div>
    );
}

export default Roles;