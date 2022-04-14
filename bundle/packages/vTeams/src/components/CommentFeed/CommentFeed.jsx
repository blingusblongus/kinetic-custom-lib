import React from 'react';
import './_CommentFeed.scss';

const CommentFeed = ({ comments }) => {
  return (
    <div className="comment-container">
      {comments?.map(comment => {
        return <div />;
      })}
    </div>
  );
};

export default CommentFeed;
