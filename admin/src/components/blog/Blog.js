import { Component } from "react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import toast, {Toaster} from "react-hot-toast";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchBlogs } from '../../store/actions/BlogAction';

class Blog extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
      this.fetchBlogs();
    }
    render(){
        return(
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
                      {/* {
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
                      } */}
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
        )
    }
}
const mapStateToProps = (state) =>{
  const { loading, blogs } = state.BlogReducer;
    return{

    };
}
const mapDispatchToProps = (dispatch) =>{
    return bindActionCreators({fetchBlogs}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Blog);