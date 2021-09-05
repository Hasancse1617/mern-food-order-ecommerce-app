import { useEffect, useState } from "react";
import toast, {Toaster} from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import $ from 'jquery';
import { addComment, fetchComments, addReply } from "../../store/actions/PostAction";
import { REMOVE_POST_MESSAGE } from "../../store/types/PostType";

const Comment = ({post_id,url}) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state)=>state.UserReducer);
    const { message, comments, totalComment } = useSelector((state)=>state.PostReducer);
    const [comment, setComment] = useState('');
    const [commentId, setCommentId] = useState('');
    const [reply, setReply] = useState('');
    const [replyreply, setReplyReply] = useState('');
    const mainComment = (e) =>{
        e.preventDefault();
        if(!user){
            toast.error('Please Login to comment');
            return false;
        }
        if(comment.length > 10){
            dispatch(addComment({user_id: user._id, post_id, comment}));
            setComment('');
        }
    }
    const replyform = (comment_id, name) =>{
        setCommentId(comment_id);
        setReply('@'+name);
        $(document).on('click', '.reply-form-open', function(){
            const id = $(this).attr("data-id");
            $('.reply-reply-comment').css("display","none");
            $('.reply-comment').css("display","none");
            $("#"+id).css("display","block");
        })
    }
    const replyreplyform = (comment_id, name) =>{
        setCommentId(comment_id);
        setReplyReply('@'+name);
        $(document).on('click', '.reply-reply-form-open', function(){
            const id = $(this).attr("data-id");
            $('.reply-reply-comment').css("display","none");
            $('.reply-comment').css("display","none");
            $("#"+id).css("display","block");
        })
    }
    const replyComment = (e) =>{
        e.preventDefault();
        if(!user){
            toast.error('Please Login to comment');
            return false;
        }
        dispatch(addReply({user_id: user._id, post_id, comment_id: commentId, reply}));
    }
    const replyreplyComment = (e) =>{
        e.preventDefault();
        if(!user){
            toast.error('Please Login to comment');
            return false;
        }
        dispatch(addReply({user_id: user._id, post_id, comment_id: commentId, reply: replyreply}));
    }
    useEffect(()=>{
        if(message){
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: message,
              toast: true,
              showConfirmButton: false,
              timer: 5000
            })
            dispatch({type: REMOVE_POST_MESSAGE});
            $('.reply-reply-comment').css("display","none");
            $('.reply-comment').css("display","none");
        }
        dispatch(fetchComments(url));
    },[message]);
    useEffect(()=>{
        dispatch(fetchComments(url));
    },[]);
    return (
        <>
          <Toaster position="top-right" reverseOrder={true}/>
           <div className="comment-area">
                <h5 className="title">{totalComment} Comments</h5>
                {comments.map((comment)=>(
                    <><div className="media">
                        <div className="media-left">
                            <img src="/assets/img/blog/comment.png" alt="img"/>
                        </div>
                        <div className="media-body">
                            {comment.user?<>
                              <a className="btn btn-base float-end reply-form-open" data-id={`reply-comment-${comment._id}`} onClick={()=>replyform(comment._id, comment.user[0].name)}>Reply</a>
                              <h6>{ comment.user[0].name }</h6></>:
                            ''}
                            <span>20 Feb 2020 at 4:00 pm</span>
                            <p>{ comment.comment }</p>
                        </div>
                    </div>

                    <form className="default-form-wrap reply-comment" id={`reply-comment-${comment._id}`} onSubmit={replyComment}>
                        <h5 className="title">Reply Comment</h5>
                        <div className="row">
                            <div className="col-12">
                                <div className="single-textarea-wrap">
                                    <textarea rows="3" value={reply} onChange={(e)=>setReply(e.target.value)} placeholder="Message..."></textarea>
                                </div>
                            </div>
                        </div>
                        
                        <button type="submit" className="btn btn-base">Submit</button>
                    </form>
                    {/* Comment replyies */}
                    {
                        comment.replies.map((reply)=>(
                            <>
                              <div className="media reply">
                                <div className="media-left">
                                    <img src="/assets/img/blog/comment.png" alt="img"/>
                                </div>
                                <div className="media-body">
  
                                    <a className="btn btn-base float-end reply-reply-form-open" data-id={`reply-comment-${reply._id}`} onClick={()=>replyreplyform(comment._id, reply.user[0].name)}>Reply</a>
                                    <h6>{ reply.user[0].name }</h6>
                                    <span>20 Feb 2020 at 4:00 pm</span>
                                    <p>{ reply.comment }</p>
                                </div>
                            </div>

                            <form className="default-form-wrap reply-reply-comment reply" id={`reply-comment-${reply._id}`} onSubmit={replyreplyComment}>
                                <h5 className="title">Reply Comment</h5>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="single-textarea-wrap">
                                            <textarea rows="3" value={replyreply} onChange={(e)=>setReplyReply(e.target.value)} placeholder="Message..."></textarea>
                                        </div>
                                    </div>
                                </div>
                                
                                <button type="submit" className="btn btn-base">Submit</button>
                            </form>
                            </>
                        ))
                    }
                    
                    </>
                ))}
            </div>
            <form className="default-form-wrap" onSubmit={mainComment}>
                <h5 className="title">Comments</h5>
                <div className="row">
                    <div className="col-12">
                        <div className="single-textarea-wrap">
                            <textarea rows="3" value={comment} onChange={(e)=>setComment(e.target.value)} placeholder="Message..."></textarea>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-base">Submit</button>
            </form>
        </>
    );
}

export default Comment;