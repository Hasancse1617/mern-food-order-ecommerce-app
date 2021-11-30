import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import toast, {Toaster} from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Swal from 'sweetalert2';
import $ from 'jquery';
import Pagination from "../pagination/Pagination";
import Loader from "../loader/Loader";
import { deleteAction, fetchBanners, statusAction } from "../../store/actions/BannerAction";
import { REMOVE_BANNER_MESSAGE, REMOVE_BANNER_REDIRECT, REMOVE_SINGLE_BANNER } from "../../store/types/BannerType";
import Forbidden from "../forbidden/Forbidden";
import { REMOVE_UNAUTHORIZED_ACCESS } from "../../store/types/AuthType";

const Banner = (props) => {
    const dispatch = useDispatch();
    const query = new URLSearchParams(props.location.search);
    const page = query.get('page')
    const {user:{ user_type}, unauthorized} = useSelector((state)=> state.AuthReducer);
    const { banners, message, loading, perPage, count, pageLink } = useSelector((state)=>state.BannerReducer);
    const bannerStatus = () =>{
        $(document).on('click', '.updateBannerStatus', function(){
            const banner_id = $(this).attr('data-banner');
            const status = $(this).children("i").attr("status");
            dispatch(statusAction({banner_id,status}));
         })
    }
    const deleteBanner = (id) =>{
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
    useEffect(()=>{
        dispatch(fetchBanners(page, user_type));
    },[page]);
    useEffect(()=>{
        if(message){
          toast.success(message);
          dispatch({type: REMOVE_BANNER_MESSAGE});
          dispatch({type: REMOVE_BANNER_REDIRECT});
          dispatch(fetchBanners(page, user_type));
        }
    },[message]);
    useEffect(()=>{
        dispatch({type: REMOVE_SINGLE_BANNER});
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
            <title>Banners - ecom website</title>
            <meta name="description" content="User Login Here" />
        </Helmet>
        <Toaster position="top-right" reverseOrder={false}/>
        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h4 className="float-left">All Banner</h4>
                    <h3><NavLink exact to="/admin/banner/create"><button type="button" class="btn btn-primary float-right text-bold">Add Banner</button></NavLink></h3>
                  </div>
                  <div class="card-body">
                    <table id="example2" class="table table-bordered table-hover">
                      <thead>
                      <tr>
                        <th>SL.</th>
                        <th>Banner Title</th>
                        <th>Banner Image</th>
                        <th>Banner Url</th>
                        <th>Banner Button Text</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                      </thead>
                      <tbody>
                    {
                      !loading?
                      banners.length > 0 ?
                      banners.map((banner, index)=>(
                          <tr key={banner._id}>
                          <td>{ index+1}</td>
                          <td>{ banner.title }</td>
                          <td><img width="100" src={`${process.env.REACT_APP_API_PATH}/images/banner_images/small/${banner.image}`}/></td>
                          <td>{ banner.btn_text }</td>
                          <td>{ banner.btn_url }</td>
                          <td>
                              {
                                (banner.status === true) ? 
                                <a class="updateBannerStatus" data-banner={banner._id} id={`banner-${banner._id}`} onClick={bannerStatus} href="javascript:void(0)"> <i class="fas fa-toggle-on" status={banner.status===true?'true':'false'} aria-hidden="true"></i></a>
                                :<a class="updateBannerStatus" data-banner={banner._id} id={`banner-${banner._id}`} onClick={bannerStatus} href="javascript:void(0)"> <i class="fas fa-toggle-off" status={banner.status===true?'true':'false'} aria-hidden="true"></i> </a> 
                              }
                          </td>
                          <td style={{width: "10%"}}>
                            <NavLink exact to={`/admin/banner/edit/${banner._id}`} ><button className="text-success" ><i className="fas fa-edit"></i></button></NavLink>&nbsp;
                            <button onClick={() => deleteBanner(banner._id)} className="text-danger"><i className="fas fa-trash"></i></button>&nbsp;
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

export default Banner;