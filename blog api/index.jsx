// use dummy api post

import React, { useState, useEffect } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 10;

  // Fetch posts with pagination
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://dummyjson.com/posts?limit=${limit}&skip=${(page - 1) * limit}`
    )
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setLoading(false);
      });
  }, [page]);

  function openPost(id) {
    fetch(`https://dummyjson.com/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedPost(data);
      })
      .catch((err) => {
        console.error("Error fetching single post:", err);
      });
  }

  function closePost() {
    setSelectedPost(null);
  }

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Blog (DummyJSON)</h1>

      {loading && <p>Loading posts...</p>}

      {!loading && !selectedPost && (
        <div>
          {posts.map((post) => (
            <div
              key={post.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                margin: "10px 0",
                padding: "10px",
                cursor: "pointer",
              }}
              onClick={() => openPost(post.id)}
            >
              <h2>{post.title}</h2>
              <p>{post.body.substring(0, 100)}... </p>
              <small>
                Tags: {post.tags.join(", ")} | Views: {post.views}
              </small>
            </div>
          ))}

          <div style={{ marginTop: "20px" }}>
            <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
              Previous
            </button>
            <span style={{ margin: "0 10px" }}>Page {page}</span>
            <button onClick={() => setPage(page + 1)}>Next</button>
          </div>
        </div>
      )}

      {selectedPost && (
        <div>
          <button onClick={closePost}>Back to all posts</button>
          <h2>{selectedPost.title}</h2>
          <p>{selectedPost.body}</p>
          <small>
            Tags: {selectedPost.tags.join(", ")} | Views: {selectedPost.views}
          </small>

          <h3>Comments</h3>
          <PostComments postId={selectedPost.id} />
        </div>
      )}
    </div>
  );
}

function PostComments({ postId }) {
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);

  useEffect(() => {
    setLoadingComments(true);
    fetch(`https://dummyjson.com/posts/${postId}/comments`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data.comments);
        setLoadingComments(false);
      })
      .catch((err) => {
        console.error("Error fetching comments:", err);
        setLoadingComments(false);
      });
  }, [postId]);

  if (loadingComments) return <p>Loading comments...</p>;
  if (!comments.length) return <p>No comments.</p>;

  return (
    <ul>
      {comments.map((c) => (
        <li key={c.id}>
          <strong>{c.user.fullName}</strong> says:
          <br />
          {c.body}
        </li>
      ))}
    </ul>
  );
}

export default App;
