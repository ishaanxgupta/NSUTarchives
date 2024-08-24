import React from "react";
import "./Post.css";

function Post({ id,username, category,location,CGPA_criteria,backlog,branches }) {
  return (
    <div className="post">
      <p className="p-id">{id}</p>
      <p className="post-username">{username}</p>
      <p className="post-category">{category}</p>
      <p className="post-location">{location}</p>
      <p className="post-cgpa-critera">{CGPA_criteria}</p>
      <p className="post-backlog">{backlog}</p>
      <p className="post-branches">{branches}</p>
    </div>
  );
}

export default Post;
