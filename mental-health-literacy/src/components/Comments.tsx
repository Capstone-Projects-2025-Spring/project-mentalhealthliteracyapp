import React, { useState } from "react";
import "./Comments.css";

interface Comment {
  username: string;
  text: string;
}

interface CommentsProps {
  comments: Comment[];
  onAddComment: (comment: Comment) => void;
  onClose: () => void;
}

const Comments: React.FC<CommentsProps> = ({
  comments,
  onAddComment,
  onClose,
}) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment({ username: "Guest", text: newComment });
      setNewComment("");
    }
  };

  return (
    <div className="comments-overlay">
      <div className="comments-container">
        <button className="comments-close-button" onClick={onClose}>
          ×
        </button>
        <h3>Comments</h3>
        <div className="comments-list">
          {comments.map((comment, index) => (
            <div key={index} className="comment">
              <strong>{comment.username}</strong>
              <p>{comment.text}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="comment-form">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button type="submit">Post</button>
        </form>
      </div>
    </div>
  );
};

export default Comments;
