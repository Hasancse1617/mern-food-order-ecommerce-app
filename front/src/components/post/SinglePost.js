import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { postCategories, recentPosts, singlePost } from "../../store/actions/PostAction";
import Loader from "../loader/Loader";
import moment from "moment";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, LinkedinShareButton, PinterestShareButton } from 'react-share';
import Comment from "./Comment";

const SinglePost = (props) => {
    const { url } = useParams();
    const dispatch = useDispatch();
    const scrollRef = useRef(null);
    const [search, setSearch] = useState('');
    const [htmlloading, setHtmlLoading] = useState(true);
    const { loading, categories, recentposts, post } = useSelector((state)=>state.PostReducer);
    useEffect(()=>{
        setHtmlLoading(false);
        dispatch(recentPosts(url));
        dispatch(postCategories());
        dispatch(singlePost(url));
    },[]);
    useEffect(()=>{
        if(!htmlloading){
            scrollRef.current.scrollIntoView();
        }
        dispatch(recentPosts(url));
        dispatch(singlePost(url));
    },[url]);
    const searchPost = (e) =>{
        e.preventDefault();
        if(search.length > 2){
            props.history.push(`/post?search=${search}&page=1`);
            setSearch('');
        }
    }
    return !htmlloading? (
        <>
           {loading ? <Loader/> :''}
            <section className="breadcrumb-area">
                <div className="banner-bg-img"></div>
                <div className="banner-shape-1"><img src="/assets/img/banner/shape-1.png" alt="img"/></div>
                <div className="banner-shape-2"><img src="/assets/img/banner/shape-2.png" alt="img"/></div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 align-self-center">
                            <div className="banner-inner text-center">
                                <h3>Blog Details
                                </h3>
                                <h1>Food Blog</h1>
                                <nav aria-label="breadcrumb">
                                    <ul className="breadcrumb">
                                    <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                                    <li className="breadcrumb-item"><NavLink to={`/post?page=1`}>Blog</NavLink></li>
                                    <li className="breadcrumb-item active" aria-current="page">Blog Details</li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div ref={scrollRef}></div>
            <div className="blog-single-area pd-top-120 pd-bottom-90">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="blog-details-inner">
                                <div className="thumb image-height pb-4">
                                    <img width="100%" src={`/images/post_images/large/${post.image}`} alt="img"/>
                                </div> 
                                <span className="cat">
                                    <span className="date">
                                        <i className="ri-calendar-todo-fill"></i>{moment(post.createdAt).format('MMMM D, YYYY')}
                                    </span>
                                    {post.category_id? <NavLink to={`/post/${post.category_id.url}?page=1`} className="tag me-0">
                                        <i className="ri-price-tag-3-fill"></i>{ post.category_id.category_name }
                                    </NavLink>:''}
                                </span>                       
                                <h3>{ post.title }</h3>
                                <p>{ post.description }</p>
                                
                            </div>
                            <div className="tag-share-area">
                                <div className="row">
                                    <div className="col-sm-6 align-self-center">
                                        <div className="tag-inner">
                                            <span>Tags: </span>
                                            <a href="#">Fresh Food, </a>
                                            <a href="#">Spicy, </a>
                                            <a href="#">Delicious</a>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 mt-3 mt-sm-0 align-items-center">
                                        <ul className="social-area text-sm-end mt-md-0 mt-2">
                                            <li><a href="#"><FacebookShareButton url={`/post/single/${url}`}><i className="fab fa-facebook-f"></i></FacebookShareButton></a></li> 
                                            <li><a href="#"><TwitterShareButton url={`/post/single/${url}`}><i className="fab fa-twitter"></i></TwitterShareButton></a></li> 
                                            <li><a href="#"><WhatsappShareButton url={`/post/single/${url}`}><i className="fab fa-whatsapp"></i></WhatsappShareButton></a></li> 
                                            <li><a href="#"><LinkedinShareButton url={`/post/single/${url}`}><i className="fab fa-linkedin-in"></i></LinkedinShareButton></a></li> 
                                            <li><a href="#"><PinterestShareButton url={`/post/single/${url}`}><i className="fab fa-pinterest"></i></PinterestShareButton></a></li> 
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <Comment post_id={post._id} url={url} />
                        </div>
                        <div className="col-lg-4">
                            <div className="sidebar-area">
                                <div className="widget widget_search">
                                    <form className="search-form" onSubmit={searchPost}>
                                        <div className="form-group">
                                            <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search your itmes"/>
                                        </div>
                                        <button className="submit-btn" type="submit"><i className="ri-search-line"></i></button>
                                    </form>
                                </div>
                                <div className="widget widget_categories">
                                    <h4 className="widget-title">Categories</h4>
                                    <ul>
                                        {categories.map((category)=>(
                                           <li><NavLink to={`/post/${category.url}?page=1`}>{ category.category_name }</NavLink></li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="widget widget-recent-post">
                                    <h4 className="widget-title">Recent Post</h4>
                                    <ul>
                                    {recentposts.map((post)=>(
                                        <li>
                                            <div className="media">
                                                <div className="media-left">
                                                    <img src={`/images/post_images/${post.image}`} width="50" alt="widget"/>
                                                </div>
                                                <div className="media-body">
                                                    <h6 className="title"><NavLink to={`/post/single/${post.url}`}>{ post.title }</NavLink></h6>
                                                </div>
                                            </div>
                                        </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    ):''
}

export default SinglePost;