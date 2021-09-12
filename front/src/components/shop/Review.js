import $ from 'jquery';
import { useEffect, useState } from 'react';
import toast, {Toaster} from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingle } from '../../store/actions/ProductAction';
import { fetchReview, reviewAction } from '../../store/actions/ReviewAction';
import { REMOVE_REVIEW_MESSAGE } from '../../store/types/ReviewType';

const Review = ({code}) => {
    const dispatch = useDispatch();
    const [rating, setRating] = useState(0);
    const [review, setReviw] = useState('');
    const { user } = useSelector((state)=>state.UserReducer);
    const { message, reviews } = useSelector((state)=>state.ReviewReducer);
    const addReview = () =>{
        $(document).on('click', '.add_review', function(){
            $('.add_review').removeClass('active');
            $(this).addClass('active');
            const rate = $(this).attr('data-review');
            setRating(rate);
        })
    }
    const submitAction = (e) =>{
        e.preventDefault();
        if(!user){
            toast.error('Please Login to add Review');
            return false;
        }
        if(rating === 0){
            toast.error('Rating is required');
            return false;
        }
        if(review === ''){
            toast.error('Review is required');
            return false;
        }
        dispatch(reviewAction({rating, user_id: user._id, code, review}));
    }
    useEffect(()=>{
        dispatch(fetchReview({code, user_id: user._id}));
    },[]);
    useEffect(()=>{
        if(message){
            toast.success(message);
            setRating(0);
            setReviw('');
            $('.add_review').removeClass('active');
            dispatch(fetchSingle(code));
            dispatch(fetchReview({code, user_id: user._id}));
            dispatch({type: REMOVE_REVIEW_MESSAGE});
        }
    },[message]);
    const reviewStar = (rating) =>{
        const review = [];
        for (let index = 0; index < 5; index++) {
            if(index < rating){
                review.push(<i style={{color: '#d80027'}} className="fas fa-star"></i>)
            }else{
                review.push(<i className="fas fa-star"></i>)
            }
        }
        return review;
    }
    return (
        <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
            <Toaster position="top-right" reverseOrder={true}/>
            <div className="comment-area">
                {reviews.map((review)=>(
                    <div className="media">
                        <div className="media-left">
                            <img src="/assets/img/blog/comment.png" alt="img"/>
                        </div>
                        <div className="media-body">
                            <h6>{ review.customer_id.name }</h6>
                            <span>20 Feb 2020 at 4:00 pm</span>
                            <p> 
                                {reviewStar(review.rating)}
                            </p>
                            <p>{ review.review }</p>
                        </div>
                    </div>
                ))}
            </div>
            <form className="default-form-wrap style-2">
                <div className="row">
                    <h3>Add Review</h3>
                    <div className="col-md-6">
                        <div className="add_review" data-review="5" onClick={addReview}>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                        </div>
                        <div className="add_review" data-review="4" onClick={addReview}>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                        </div>
                        <div className="add_review" data-review="3" onClick={addReview}>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                        </div>
                        <div className="add_review" data-review="2" onClick={addReview}>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                        </div>
                        <div className="add_review" data-review="1" onClick={addReview}>
                            <i className="fas fa-star"></i>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="single-textarea-wrap">
                            <textarea value={review} onChange={(e)=>setReviw(e.target.value)} rows="4" placeholder="Review..."></textarea>
                        </div>
                    </div>
                </div>
                <button type="submit" onClick={submitAction} className="btn btn-base">Submit</button>
            </form>
        </div>
    );
}

export default Review;