import { useEffect } from "react";
import { Helmet } from "react-helmet";
import toast, {Toaster} from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Swal from 'sweetalert2'
import Pagination from "../pagination/Pagination";
import Loader from "../loader/Loader";
import $ from 'jquery';
import { REMOVE_CATEGORY_MESSAGE, REMOVE_CATEGORY_REDIRECT, REMOVE_SINGLE_CATEGORY } from "../../store/types/CategoryType";
import { deleteAction, fetchCategories, statusAction } from "../../store/actions/CategoryAction";
import Forbidden from "../forbidden/Forbidden";
import { REMOVE_UNAUTHORIZED_ACCESS } from "../../store/types/AuthType";


const Category = (props) => {

  const {user:{ user_type}, unauthorized} = useSelector((state)=> state.AuthReducer);
  const {message,loading,categories,count,perPage,pageLink, category_status, categoryId} = useSelector((state)=> state.CategoryReducer);
  const dispatch = useDispatch();
  const query = new URLSearchParams(props.location.search);
  const page = query.get('page')

  const deleteCategory = (id) =>{
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
        dispatch(deleteAction(id, user_type));
      }
    })
  }
  const categoryStatus = () =>{
    $(document).on('click', '.updateCategoryStatus', function(){
       const category_id = $(this).attr('data-category');
       const status = $(this).children("i").attr("status");
       dispatch(statusAction({category_id,status}));
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
      dispatch({type: REMOVE_CATEGORY_MESSAGE});
      dispatch({type: REMOVE_CATEGORY_REDIRECT});
      dispatch(fetchCategories(page, user_type));
    }
  },[message]);

  useEffect(()=>{
      dispatch(fetchCategories(page, user_type));
  },[page]);
  // Category Status Code
  useEffect(()=>{
      if(category_status === false){
        $('#category-'+categoryId).html(`<i class='fas fa-toggle-off' aria-hidden='true' status=${category_status}></i>`);
      }else{
        $('#category-'+categoryId).html(`<i class='fas fa-toggle-on' aria-hidden='true' status=${category_status}></i>`);
      }
  },[category_status,categoryId]);

  useEffect(()=>{
    dispatch({type: REMOVE_SINGLE_CATEGORY});
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
            <title>Categories - ecom website</title>
            <meta name="description" content="User Login Here" />
        </Helmet>
        <Toaster position="top-right" reverseOrder={false}/>
        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h4 className="float-left">All Category</h4>
                    <h3><NavLink exact to="/admin/category/create"><button type="button" class="btn btn-primary float-right text-bold">Add Category</button></NavLink></h3>
                  </div>
                  <div class="card-body">
                    <table id="example2" class="table table-bordered table-hover">
                      <thead>
                      <tr>
                        <th>SL.</th>
                        <th>Category Name</th>
                        <th>Category Url</th>
                        <th>Category Image</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                      </thead>
                      <tbody>
                    {
                      !loading?
                      categories.length > 0 ?
                      categories.map((category, index)=>(
                          <tr key={category._id}>
                          <td>{ index+1}</td>
                          <td>{ category.category_name }</td>
                          <td>{ category.url }</td>
                          <td><img src={`${process.env.REACT_APP_API_PATH}/images/category_images/${category.category_image}`}/></td>
                          <td>
                              {
                                (category.status === true) ? 
                                <a class="updateCategoryStatus" data-category={category._id} id={`category-${category._id}`} onClick={categoryStatus} href="javascript:void(0)"> <i class="fas fa-toggle-on" status={category.status===true?'true':'false'} aria-hidden="true"></i></a>
                                :<a class="updateCategoryStatus" data-category={category._id} id={`category-${category._id}`} onClick={categoryStatus} href="javascript:void(0)"> <i class="fas fa-toggle-off" status={category.status===true?'true':'false'} aria-hidden="true"></i> </a> 
                              }
                          </td>
                          <td>
                            <NavLink exact to={`/admin/category/edit/${category._id}`} ><button className="text-success" ><i className="fas fa-edit"></i></button></NavLink>&nbsp;
                            <button onClick={() => deleteCategory(category._id)} className="text-danger"><i className="fas fa-trash"></i></button>&nbsp;
                          </td>
                        </tr>
                        ))
                        :'No Categories found'
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

export default Category;