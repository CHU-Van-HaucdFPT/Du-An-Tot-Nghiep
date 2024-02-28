import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/css/comment.css'
const CommentSection = ({ productId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    // Fetch comments when component mounts
    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`https://du-an-tot-nghiep-be-1.vercel.app/comment/all/${productId}`);
            setComments(response.data);
            // const comment = response.data;
            // console.log(comment)
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };
    // console.log(localStorage.getItem('', )))
    
    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`https://du-an-tot-nghiep-be-1.vercel.app/comment`, {
                userId: localStorage.getItem('userid'), 
                role: localStorage.getItem('userRole'),
                productId: productId,
                comment: newComment,
            });
            setComments([...comments, response.data]);
            setNewComment('newComment');
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };    return (
        <div class="comment-container">
            <div class="col-sm-5 col-md-6 col-12 pb-4">
                <h1>Danh Sách Bình Luận</h1>
                <div class="comment ">
                    {comments.map((comment, index) => (
                        
                        <div key={index}>
                            
                            <div class="d-flex flex-row user-info bi bi-person" >
                                <div class="d-flex flex-column justify-content-start ml-2"><p class="d-block font-weight-bold name">{comment.userId}</p><span class="date text-black-50">{comment.createdAt}</span></div>
                            </div>
                            <div><h3>{comment.comment}</h3></div>

                            
                                <div class="d-flex flex-row fs-12">
                                    <div class="like p-2 cursor"><i class="fa fa-thumbs-o-up"></i><span class="ml-1">Like</span></div>
                                    <div class="like p-2 cursor"><i class="fa fa-commenting-o"></i><span class="ml-1">Comment</span></div>
                                    <div class="like p-2 cursor"><i class="fa fa-share"></i><span class="ml-1">Share</span></div>
                                </div>
                        </div>
                        
                    ))}
                </div>
            </div>
                <div class="col-lg-4 col-md-5 col-sm-4 offset-md-1 offset-sm-1 col-12 mt-4">
                <div class="form-group">
                
                <form onSubmit={handleCommentSubmit}>
                        <h4>Hỏi Đáp</h4>
                        <div>
                        <label htmlFor="">Name</label>
                            <textarea name="msg" id="" msg cols="30" rows="1" class="form-control"
                           
                            onChange={(e) => setNewComment(e.target.value)}
                                placeholder="fill in your name..."
                            required
                        />
                        </div>
                        <label htmlFor="">Email</label>

                        <textarea name="msg" id="" msg cols="30" rows="1" class="form-control"

                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder=" fill in your Email..."
                            required
                        />
                       
                    <textarea name="msg" id="" msg cols="30" rows="5" class="form-control"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write your comment here..."
                        required
                    />
                    <button type="submit" id="post" class="btn">Post Comment</button>
            </form>
                </div>
              
            </div>
        </div>
    );
};

export default CommentSection;
