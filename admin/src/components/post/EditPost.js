import { connect } from "react-redux";
import { Component } from "react";
import { Helmet } from "react-helmet";
import toast, {Toaster} from "react-hot-toast";
import { NavLink } from "react-router-dom";
import Loader from "../loader/Loader";
import { fetchPost, updateAction } from "../../store/actions/PostAction";
import { REMOVE_POST_ERRORS, REMOVE_SINGLE_POST } from "../../store/types/PostType";

class EditPost extends Component{
    constructor(props){
        super(props);
        this.state={
            title:'',
            url:'',
            image:'',
            description:'',
            preview:'',
        }
    }
    handleNameUrl = (e) =>{
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
        const createUrl = e.target.value.trim().split(' ').join('-');
        this.setState({url: createUrl.toLowerCase()});
    }
    handleInput = (e) =>{
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }
    handleImage = (e) =>{
        if(e.target.files.length !== 0){
            const reader = new FileReader();
            this.setState({
                ...this.state,
                [e.target.name]: e.target.files[0]
            });
            reader.onloadend = () =>{
                this.setState({preview: reader.result});
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    }
    componentDidMount = () =>{
        const id = this.props.match.params.id;
        console.log(this.props)
        this.props.dispatch(fetchPost(id));
    }
    componentDidUpdate = () =>{
        const {post,status,redirect,postErrors} = this.props.state;
        if(status){
            this.setState({
                title: post.title,
                url: post.url,
                preview: `/images/post_images/${post.image}`,
                description: post.description
            });
            this.props.dispatch({type: REMOVE_SINGLE_POST});
         }

        if(redirect){
            this.props.history.push('/admin/post/all?page=1');
        }
        if(postErrors.length > 0){
            postErrors.map((error)=>{
                toast.error(error.msg);
            });
            this.props.dispatch({type: REMOVE_POST_ERRORS});
        }
    }
    updatePost = (e) =>{
        e.preventDefault();
        const id = this.props.match.params.id;
        const {title,url,description,image} = this.state;
        const formData = new FormData();
        formData.append('title',title);
        formData.append('image',image);
        formData.append('description',description);
        formData.append('url', url);
        this.props.dispatch(updateAction(formData,id));
    }
    render(){
        const { preview, title, url, description } = this.state;
        const {loading,redirect} = this.props.state;
        return(
            <div class="content-wrapper">
            <Helmet>
                <title>Update post - ecom website</title>
                <meta name="description" content="User add Here" />
            </Helmet>
            <Toaster position="top-right" reverseOrder={false}/>
            <section class="content">
            <div class="container-fluid">
                <div class="row">
                <div class="col-12">
                    <div class="card">
                    <div class="card-header">
                        <h4 className="float-left">Edit Post</h4>
                        <h3><NavLink exact to="/admin/post/all?page=1" className="btn btn-sm btn-success float-right text-bold">All Post</NavLink></h3>
                    </div>
                    {!loading?<form role="form" onSubmit={this.updatePost}>
                        <div class="card-body">
                        <div class="form-group row">
                            <label for="exampleInputName" className="col-sm-2  col-form-label">Post title</label>
                            <div className="col-sm-8">
                            <input type="text" name="title" value={title} onChange={this.handleNameUrl} class="form-control" id="exampleInputName" placeholder="Enter Post Title"/>
                            </div> 
                        </div>
                        <div class="form-group row">
                            <label for="exampleInputEmail1" className="col-sm-2  col-form-label">Url</label>
                            <div className="col-sm-8">
                            <input type="text" name="url" value={url} class="form-control" id="exampleInputEmail1" placeholder="Enter url" readOnly/>
                            </div> 
                        </div>
                        <div class="form-group row">
                            <label for="exampleInputImage" className="col-sm-2  col-form-label">Post Image</label>
                            <div className="col-sm-8">
                                <input type="file" onChange={this.handleImage} name="image"  class="form-control"/>
                            </div>
                        </div>
                        {preview?(
                        <div class="form-group row">
                            <label for="exampleInputPreview" className="col-sm-2  col-form-label">Image Preview</label>
                            <div className="col-sm-8">
                                <img src={preview} width="100" height="100"></img>
                            </div>
                        </div>
                        ):('')}
                        <div class="form-group row">
                            <label for="exampleInputImage" className="col-sm-2  col-form-label">Description</label>
                            <div className="col-sm-8">
                                <textarea onChange={this.handleInput} name="description"  class="form-control" value={description}></textarea>
                            </div>
                        </div>
                        <div class="form-group col-6 offset-sm-2">
                            <button type="submit" class="btn btn-primary">Update</button>
                        </div>
                        </div>
                    </form>: <Loader/> }
                    </div>
                    </div>
                </div>
                </div>
            </section>
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return{ state: state.PostReducer };
}
export default connect(mapStateToProps)(EditPost);