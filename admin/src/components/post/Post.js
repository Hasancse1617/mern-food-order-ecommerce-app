import { Component } from "react";
import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import toast, {Toaster} from "react-hot-toast";
import { connect } from "react-redux";
import Pagination from "../pagination/Pagination";
import Loader from "../loader/Loader";
import Swal from 'sweetalert2'
import $ from 'jquery';
import { deleteAction, fetchPosts, statusAction } from '../../store/actions/PostAction';
import { REMOVE_POST_MESSAGE, REMOVE_POST_REDIRECT } from "../../store/types/PostType";

class Post extends Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
      this.props.dispatch(fetchPosts(this.props.page));
    }
    componentDidUpdate = (prevProps) =>{
        const { message } = this.props.state;
        if(message){
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: message,
              toast: true,
              showConfirmButton: false,
              timer: 2000
            })
          this.props.dispatch({type: REMOVE_POST_MESSAGE});
          this.props.dispatch({type: REMOVE_POST_REDIRECT});
          this.props.dispatch(fetchPosts(this.props.page));
        }
        if(prevProps.page !== this.props.page){
          this.props.dispatch(fetchPosts(this.props.page));
        }
    }
    deletePost = (id) =>{
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
          this.props.dispatch(deleteAction(id));
        }
      })
    }
    postStatus = () =>{
      const { dispatch } = this.props;
      $(document).on('click', '.updatePostStatus', function(){
        const post_id = $(this).attr('data-post');
        const status = $(this).children("i").attr("status");
        dispatch(statusAction({post_id, status}));
      })
    }
    render(){
      const {loading,posts,perPage,count,pageLink} = this.props.state;
        return(
          <div class="content-wrapper">
          <Helmet>
              <title>Posts - ecom website</title>
              <meta name="description" content="User Login Here" />
          </Helmet>
          <Toaster position="top-right" reverseOrder={false}/>
          <section class="content">
            <div class="container-fluid">
              <div class="row">
                <div class="col-12">
                  <div class="card">
                    <div class="card-header">
                      <h4 className="float-left">All Post</h4>
                      <h3><NavLink exact to="/admin/post/create"><button type="button" class="btn btn-primary float-right text-bold">Add Post</button></NavLink></h3>
                    </div>
                    <div class="card-body">
                      <table id="example2" class="table table-bordered table-hover">
                        <thead>
                        <tr>
                          <th>SL.</th>
                          <th>Post Title</th>
                          <th>Category</th>
                          <th>Post Image</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                        </thead>
                        
                        {!loading?<tbody>
                            {
                            posts.length > 0 ?
                            posts.map((post, index)=>(
                                <tr key={post._id}>
                                <td>{ index+1}</td>
                                <td>{ post.title }</td>
                                <td>{ post.category_id.category_name }</td>
                                <td><img width="100" src={`/images/post_images/${post.image}`}/></td>
                                <td>
                                    {
                                      (post.status === true) ? 
                                      <a class="updatePostStatus" data-post={post._id} id={`post-${post._id}`} onClick={this.postStatus} href="javascript:void(0)"> <i class="fas fa-toggle-on" status={post.status===true?'true':'false'} aria-hidden="true"></i></a>
                                      :<a class="updatePostStatus" data-post={post._id} id={`post-${post._id}`} onClick={this.postStatus} href="javascript:void(0)"> <i class="fas fa-toggle-off" status={post.status===true?'true':'false'} aria-hidden="true"></i> </a> 
                                    }
                                </td>
                                <td>
                                  <NavLink exact to={`/admin/post/edit/${post._id}`} ><button className="text-success" ><i className="fas fa-edit"></i></button></NavLink>&nbsp;
                                  <button onClick={() => this.deletePost(post._id)} className="text-danger"><i className="fas fa-trash"></i></button>&nbsp;
                                </td>
                              </tr>
                              ))
                              :'No Posts found'
                            }
                        </tbody>:<Loader/>}
                      </table>
                      
                    </div>
                  </div>
                  </div>
                </div>
              </div>
             {!loading ? <Pagination page={this.props.page} perPage={perPage} count={count} pageLink={pageLink} /> : ''}
          </section>
          </div>
        )
    }
}
const mapStateToProps = (state, ownProps) =>{
    // const { loading, posts, perPage, count, pageLink } = state.PostReducer;
    const query = new URLSearchParams(ownProps.location.search);
    const page = query.get('page');
    return{ state: state.PostReducer, page};
}
export default connect(mapStateToProps)(Post);