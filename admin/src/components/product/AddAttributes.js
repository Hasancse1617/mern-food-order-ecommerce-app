import { Helmet } from "react-helmet";
import Swal from 'sweetalert2'
import toast, {Toaster} from "react-hot-toast";
import Loader from "../loader/Loader";
import $ from 'jquery';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProduct, addAttributes, fetcAttributes, attributestatusAction, deleteAttributeAction } from "../../store/actions/ProductAction";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";
import { REMOVE_PRODUCT_ERRORS, REMOVE_PRODUCT_MESSAGE } from "../../store/types/ProductType";

const AddAttributes = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const { loading, product, productErrors, message, attributes } = useSelector((state)=>state.ProductReducer);
    const [size, setSize] = useState('');
    const [sku, setSku] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const addProductAttribute = (e) =>{
        e.preventDefault();
        dispatch(addAttributes({size,sku,price,stock},id));
        setSize('');
        setSku('');
        setPrice('');
        setStock('');
    }
    const productAttributeStatus = () =>{
        $(document).on('click', '.updateAttributeStatus', function(){
            const attribute_id = $(this).attr('data-attribute');
            const status = $(this).children("i").attr("status");
            dispatch(attributestatusAction({attribute_id,status}));
        })
    }
    const deleteAttribute = (id) =>{
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
              dispatch(deleteAttributeAction(id));
            }
        })
    }
    useEffect(()=>{
        dispatch(fetchProduct(id));
        dispatch(fetcAttributes(id));
    },[]);
    useEffect(()=>{
        if(productErrors.length > 0){
            productErrors.map((error)=>{
                toast.error(error.msg);
            });
            dispatch({type: REMOVE_PRODUCT_ERRORS});
        }
    },[productErrors]);
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
          dispatch(fetcAttributes(id));
        }
      },[message]);
    return (
        <div class="content-wrapper">
            <Helmet>
                <title>Add Product Attributes - ecom website</title>
                <meta name="description" content="User add Here" />
            </Helmet>
            <Toaster position="top-right" reverseOrder={true}/>
            <section class="content">
            <div class="container-fluid">
                <div class="row">
                <div class="col-12">
                    <div class="card">
                    <div class="card-header">
                        <h4 className="float-left">Add/Edit Product Attributes</h4>
                        <h3><NavLink exact to="/admin/product/all?page=1" className="btn btn-sm btn-success float-right text-bold">All Product</NavLink></h3>
                    </div>
                    <form role="form" onSubmit={addProductAttribute}>
                        <div class="card-body">
                        <div class="form-group row">
                            <label for="exampleInputName" className="col-sm-2  col-form-label">Product Name: </label>
                            <div className="col-sm-8">
                                <p><b>{ product.product_name }</b></p>
                            </div> 
                        </div>
                        <div class="form-group row">
                            <label for="exampleInputName" className="col-sm-2  col-form-label">Product Code</label>
                            <div className="col-sm-8">
                                <p><b>{ product.product_code }</b></p>
                            </div> 
                        </div>
                        <div class="form-group row">
                            <label for="exampleInputName" className="col-sm-2  col-form-label">Main Image</label>
                            <div className="col-sm-8">
                            <img width="100" height="100" src={`/images/product_images/${product.product_image}`}/>
                            </div> 
                        </div>
                        <div class="form-group row">
                            <div class="field_wrapper">
                                <div>
                                    <input type="text" value={size} onChange={(e)=>setSize(e.target.value)} className="size" name="size" placeholder="Size" style={{width: 110+'px'}} required="" />&nbsp;
                                    <input type="text" value={sku} onChange={(e)=>setSku(e.target.value)} className="sku" name="sku"  placeholder="SKU" style={{width: 110+'px'}} required="" />&nbsp;
                                    <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} className="price" name="price"  placeholder="Price" style={{width: 110+'px'}} required="" />&nbsp;
                                    <input type="number" value={stock} onChange={(e)=>setStock(e.target.value)} className="stock" name="stock"  placeholder="Stock" style={{width: 110+'px'}} required="" />&nbsp;
                                    {/* <a onClick={appendAttribute} href="javascript:void(0);" class="add_button" title="Add field">Add</a> */}
                                </div>
                                
          					</div>
                        </div>
                        <div class="form-group row">
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </div>
                        </div>
                    </form>
                    </div>
                    </div>
                </div>
                </div>
            </section>
            <section class="content">
                <div class="container-fluid">
                    <div class="row">
                    <div class="col-12">
                        <div class="card">
                        <div class="card-header">
                            <h4 className="float-left">Product Attributes</h4>
                        </div>
                        <div class="card-body">
                            <table id="example2" class="table table-bordered table-hover">
                            <thead>
                            <tr>
                                <th>SL.</th>
                                <th>Product Size</th>
                                <th>Product SKU</th>
                                <th>Product Price</th>
                                <th>Product Stock</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                            !loading?
                            attributes.length > 0 ?
                            attributes.map((attribute, index)=>(
                                <tr key={attribute.id}>
                                <td>{ index+1}</td>
                                <td><input type="text" value={attribute.size}/></td>
                                <td><input type="text" value={attribute.sku}/></td>
                                <td><input type="text" value={attribute.price}/></td>
                                <td><input type="text" value={attribute.stock}/></td>
                                <td>
                                    {
                                        (attribute.status === true) ? 
                                        <a class="updateAttributeStatus" data-attribute={attribute._id} id={`attribute-${attribute._id}`} onClick={productAttributeStatus} href="javascript:void(0)"> <i class="fas fa-toggle-on" status={attribute.status===true?'true':'false'} aria-hidden="true"></i></a>
                                        :<a class="updateAttributeStatus" data-attribute={attribute._id} id={`attribute-${attribute._id}`} onClick={productAttributeStatus} href="javascript:void(0)"> <i class="fas fa-toggle-off" status={attribute.status===true?'true':'false'} aria-hidden="true"></i> </a> 
                                    }
                                </td>
                                <td>
                                    <button title="Delete" onClick={() => deleteAttribute(attribute._id)} className="text-danger"><i className="fas fa-trash"></i></button>&nbsp;
                                </td>
                                </tr>
                                ))
                                :'No Images found'
                            :(<Loader/>)
                            }
                               </tbody>
                            
                            </table>
                            </div>
                            
                          </div>
                          
                        </div>
                      </div>
                    </div>
                </section>
            </div>
    );
}

export default AddAttributes;