import React, { useState } from "react";
import PostsList from "./components/PostsList";
import AddPostForm from "./forms/AddPost.form";
import UpdatePostForm from "./forms/UpdatePost.form";

import initialData from "./assets/initialData";

const App = () => {
  const [posts, setPosts] = useState(initialData);

  const addPost = (post) => {
    post.id = posts.length + 1;
    setPosts([...posts, post]);
  };

  const deletepost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const [editing, setEditing] = useState(false);

  const initialData = { id: null, created: "", name: "", content: "" };

  const [currentpost, setCurrentpost] = useState(initialData);

  const editpost = (id, post) => {
    setEditing(true);
    setCurrentpost(post);
  };

  const updatepost = (newpost) => {
    setPosts(
      posts.map((post) => (post.id === currentpost.id ? newpost : post))
    );
    setCurrentpost(initialData);
    setEditing(false);
  };

  return (
    <div className="container">
      <h1>React CRUD App with Hooks</h1>
      <div className="row">
        <div className="five columns">
          {editing ? (
            <div>
              <h2>Edit post</h2>
              <UpdatePostForm
                currentpost={currentpost}
                setEditing={setEditing}
                updatepost={updatepost}
              />
            </div>
          ) : (
            <div>
              <h2>Add post</h2>
              <AddPostForm addpost={addPost} />
            </div>
          )}
        </div>
        <div className="seven columns">
          <h2>View posts</h2>
          <PostsList
            posts={posts}
            deletepost={deletepost}
            editpost={editpost}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
