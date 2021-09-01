import { useEffect } from "react";
import { Helmet } from "react-helmet";
import toast, {Toaster} from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Swal from 'sweetalert2'
import Pagination from "../pagination/Pagination";
import Loader from "../loader/Loader";
import $ from 'jquery';
import { REMOVE_PRODUCT_MESSAGE, REMOVE_PRODUCT_REDIRECT, REMOVE_SINGLE_PRODUCT } from "../../store/types/ProductType";
import { deleteAction, fetchProducts, statusAction } from "../../store/actions/ProductAction";


const Product = (props) => {

  const {message,loading,products,count,perPage,pageLink } = useSelector((state)=> state.ProductReducer);
  const dispatch = useDispatch();
  const query = new URLSearchParams(props.location.search);
  const page = query.get('page')

  const deleteProduct = (id) =>{
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
  const productStatus = () =>{
    $(document).on('click', '.updateProductStatus', function(){
       const product_id = $(this).attr('data-product');
       const status = $(this).children("i").attr("status");
       dispatch(statusAction({product_id,status}));
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
      dispatch({type: REMOVE_PRODUCT_MESSAGE});
      dispatch({type: REMOVE_PRODUCT_REDIRECT});
      dispatch(fetchProducts(page));
    }
  },[message]);

  useEffect(()=>{
      dispatch(fetchProducts(page));
  },[page]);

  useEffect(()=>{
    dispatch({type: REMOVE_SINGLE_PRODUCT});
  },[]);

    return (
        <div class="content-wrapper">
        <Helmet>
            <title>Products - ecom website</title>
            <meta name="description" content="User Login Here" />
        </Helmet>
        <Toaster position="top-right" reverseOrder={false}/>
        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h4 className="float-left">All Product</h4>
                    <h3><NavLink exact to="/admin/product/create"><button type="button" class="btn btn-primary float-right text-bold">Add Product</button></NavLink></h3>
                  </div>
                  <div class="card-body">
                    <table id="example2" class="table table-bordered table-hover">
                      <thead>
                      <tr>
                        <th>SL.</th>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Product Image</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                      </thead>
                      <tbody>
                    {
                      !loading?
                      products.length > 0 ?
                      products.map((product, index)=>(
                          <tr key={product.id}>
                          <td>{ index+1}</td>
                          <td>{ product.product_name }</td>
                          <td>{ product.category_id.category_name }</td>
                          <td>{ product.product_price }</td>
                          <td><img width="100" height="100" src={`/images/product_images/${product.product_image}`}/></td>
                          <td>
                              {
                                (product.status === true) ? 
                                <a class="updateProductStatus" data-product={product._id} id={`product-${product._id}`} onClick={productStatus} href="javascript:void(0)"> <i class="fas fa-toggle-on" status={product.status===true?'true':'false'} aria-hidden="true"></i></a>
                                :<a class="updateProductStatus" data-product={product._id} id={`product-${product._id}`} onClick={productStatus} href="javascript:void(0)"> <i class="fas fa-toggle-off" status={product.status===true?'true':'false'} aria-hidden="true"></i> </a> 
                              }
                          </td>
                          <td>
                            <NavLink title="Edit" exact to={`/admin/product/edit/${product._id}`} ><button className="text-success" ><i className="fas fa-edit"></i></button></NavLink>&nbsp;
                            <NavLink title="Add/Edit images" exact to={`/admin/product/images/${product._id}`} ><button className="text-success" ><i className="fas fa-plus"></i></button></NavLink>&nbsp;
                            <NavLink title="Add/Edit attributes" exact to={`/admin/product/attribute/${product._id}`} ><button className="text-success" ><i className="fas fa-plus-circle"></i></button></NavLink>&nbsp;
                            <button title="Delete" onClick={() => deleteProduct(product._id)} className="text-danger"><i className="fas fa-trash"></i></button>&nbsp;
                          </td>
                        </tr>
                        ))
                        :'No products found'
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

export default Product;