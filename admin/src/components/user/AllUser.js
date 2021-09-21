import { useEffect } from "react";
import { Helmet } from "react-helmet";
import toast, {Toaster} from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Swal from 'sweetalert2'
import Pagination from "../pagination/Pagination";
import Loader from "../loader/Loader";
import { REMOVE_UNAUTHORIZED_ACCESS, REMOVE_USER_MESSAGE, REMOVE_USER_REDIRECT } from "../../store/types/UserType";
import { deleteAction, fetchUsers } from "../../store/actions/UserAction";
import Forbidden from "./Forbidden";


const AllUser = (props) => {

  const {message,loading,users,count,perPage,pageLink,unauthorized} = useSelector((state)=> state.UserReducer);
  const {user:{_id, user_type}} = useSelector((state)=> state.AuthReducer);
  const dispatch = useDispatch();
  const query = new URLSearchParams(props.location.search);
  const page = query.get('page')

  const deleteUser = (id) =>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteAction(id));
      }
    })
  }
  useEffect(()=>{
    if(message){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: message,
          toast: true,
          showConfirmButton: false,
          timer: 2000
        })
      dispatch({type: REMOVE_USER_MESSAGE});
      dispatch({type: REMOVE_USER_REDIRECT});
      dispatch(fetchUsers(page,user_type));
    }
  },[message]);

  useEffect(()=>{
      dispatch(fetchUsers(page,user_type));
  },[page]);
  useEffect(()=>{
      return ()=>{
        dispatch({type: REMOVE_UNAUTHORIZED_ACCESS});
      }
  },[]);
   if (unauthorized) {
      return <Forbidden/>
   }
    return (
        <div class="content-wrapper">
        <Helmet>
            <title>Users - Blog website</title>
            <meta name="description" content="User Login Here" />
        </Helmet>
        <Toaster position="top-right" reverseOrder={false}/>
        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h4 className="float-left">All User</h4>
                    <h3><NavLink exact to="/admin/user/create"><button type="button" class="btn btn-primary float-right text-bold">Add User</button></NavLink></h3>
                  </div>
                  <div class="card-body">
                    <table id="example2" class="table table-bordered table-hover">
                      <thead>
                      <tr>
                        <th>ID.</th>
                        <th>User Name</th>
                        <th>User Type</th>
                        <th>User Image</th>
                        <th>Action</th>
                      </tr>
                      </thead>
                      <tbody>
                    {
                      !loading?
                        users.length > 0 ?
                        users.map((user)=>(
                          <tr key={user._id}>
                          <td>{ user._id }</td>
                          <td>{ user.name }</td>
                          <td><span class="badge bg-success">{ user.user_type }</span></td>
                          <td><img width="100" width="100" src={`${process.env.REACT_APP_API_PATH}/images/user_images/${user.image}`}/></td>
                          <td>
                            { user._id !== _id? <button onClick={() => deleteUser(user._id)} className="text-danger"><i className="fas fa-trash"></i></button> : ''}
                          </td>
                        </tr>
                        ))
                        :'No Users found'
                      :(<Loader/>)
                    }
                      </tbody>
                    </table>
                    
                  </div>
                </div>
                </div>
              </div>
            </div>
           {!loading ? <Pagination page={page} perPage={perPage} count={count} pageLink={pageLink} /> : ''}
        </section>
        </div>
    );
}

export default AllUser;