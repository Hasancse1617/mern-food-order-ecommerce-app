import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { fetchPosts, fetchCatPosts, recentPosts, postCategories, fetchSearchPosts } from "../../store/actions/PostAction";
import moment from "moment";
import Pagination from "../pagination/Pagination";
import Loader from "../loader/Loader";

const Post = (props) => {
    const dispatch = useDispatch();
    const { url } = useParams();
    const query = new URLSearchParams(props.location.search);
    const page = query.get('page');
    const search_post = query.get('search');
    const { loading, catPosts, recentposts, categories, count, perPage } = useSelector((state)=>state.PostReducer);
    const scrollRef = useRef(null);
    const [search, setSearch] = useState('');
    const [htmlloading, setHtmlLoading] = useState(true);
    useEffect(()=>{
        setHtmlLoading(false);
        dispatch(fetchPosts());
        dispatch(fetchCatPosts(url,page));
        dispatch(recentPosts());
        dispatch(postCategories());
        if(search_post && page){
            dispatch(fetchSearchPosts(search_post,page));
        }
    },[]);
    useEffect(()=>{
        if(url !== undefined){
            scrollRef.current.scrollIntoView();
            dispatch(fetchCatPosts(url,page));
        }
    },[url,page]);
    useEffect(()=>{
        if(search_post === null && url === undefined){
            if(!htmlloading)
                scrollRef.current.scrollIntoView();
            dispatch(fetchCatPosts(url,page));
        }
    },[search_post,page,url]);
    useEffect(()=>{
        if(search_post !== null && url === undefined){
            scrollRef.current.scrollIntoView();
            dispatch(fetchSearchPosts(search_post,page));
        }
    },[search_post,page]);
    const searchPost = (e) =>{
        e.preventDefault();
        if(search.length > 2){
            props.history.push(`/post?search=${search}&page=1`);
            dispatch(fetchSearchPosts(search,page));
            setSearch('');
        } 
    }
    return !htmlloading? (
        <>{loading ? <Loader/> :''}  
           <section class="breadcrumb-area">
            <div class="banner-bg-img"></div>
            <div class="banner-shape-1"><img src="/assets/img/banner/shape-1.png" alt="img" /></div>
            <div class="banner-shape-2"><img src="/assets/img/banner/shape-2.png" alt="img" /></div>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-6 align-self-center">
                        <div class="banner-inner text-center">
                            <h3>Blog
                            </h3>
                            <h1>Food Blog</h1>
                            <nav aria-label="breadcrumb">
                                <ul class="breadcrumb">
                                <li class="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                                <li class="breadcrumb-item active" aria-current="page">Blog</li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div ref={scrollRef}></div>
        
        <section class="blog-area pd-top-120 pd-bottom-120">
            <div class="container">
              {search_post?<h4>Search result for "{search_post}"</h4>:""}
                <div class="row justify-content-center">
                    <div class="col-lg-8">
                        <div class="row justify-content-center">
                            {catPosts.map((post,index)=>(
                            <div key={index} class="col-sm-6">
                                <div class="single-blog-wrap">
                                    <div class="thumb">
                                        <img src={`/images/post_images/${post.image}`} alt="img"/>
                                    </div>
                                    <div class="wrap-details">
                                        <span class="cat">
                                            <span class="date">
                                                <i class="ri-calendar-todo-fill"></i>{moment(post.createdAt).format('MMMM D, YYYY')}
                                            </span>
                                            <NavLink to={`/post/${post.category_id.url}`} class="tag me-0">
                                                <i class="ri-price-tag-3-fill"></i>{ post.category_id.category_name }
                                            </NavLink>
                                        </span>
                                        <h5><NavLink to={`/post/single/${post.url}`}>{ post.title }</NavLink></h5> 
                                        <div class="wrap-hover-area">
                                            <p> { post.description.substr(0, 140) }
                                            </p> 
                                            <NavLink class="link-btn" to={`/post/single/${post.url}`}>Read More</NavLink> 
                                        </div>                       
                                    </div> 
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="sidebar-area">
                            <div class="widget widget_search">
                                <form class="search-form"  onSubmit={searchPost}>
                                    <div class="form-group">
                                        <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search your itmes"/>
                                    </div>
                                    <button class="submit-btn" type="submit"><i class="ri-search-line"></i></button>
                                </form>
                            </div>
                            <div class="widget widget_categories">
                                <h4 class="widget-title">Categories</h4>
                                <ul>
                                    {categories.map((category)=>(
                                      <li><NavLink to={`/post/${category.url}?page=1`}>{ category.category_name }</NavLink></li>
                                    ))}
                                </ul>
                            </div>
                            <div class="widget widget-recent-post">
                                <h4 class="widget-title">Recent Post</h4>
                                <ul>
                                   {recentposts.map((post)=>(
                                    <li>
                                        <div class="media">
                                            <div class="media-left">
                                                <img src={`/images/post_images/${post.image}`} width="50" alt="widget"/>
                                            </div>
                                            <div class="media-body">
                                                <h6 class="title"><NavLink to={`/post/single/${post.url}`}>{ post.title }</NavLink></h6>
                                            </div>
                                        </div>
                                    </li>
                                    ))}
                                </ul>
                            </div>
                            
                        </div>
                    </div>
                    {count > perPage? 
                    <div class="col-12">
                        {url === undefined?
                           <Pagination count={count} perPage={perPage} page={page} pageLink={`/post`} search={search_post} />
                        : <Pagination count={count} perPage={perPage} page={page} pageLink={`/post/${url}`} />}
                    </div>:''}
                </div>
            </div>
        </section>
        </>
    ):''
}

export default Post;