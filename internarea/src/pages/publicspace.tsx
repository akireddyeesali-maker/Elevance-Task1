"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PublicSpace() {
  const [caption, setCaption] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [mediaType, setMediaType] = useState("image");
  const [posts, setPosts] = useState<any[]>([]);
  const [comment, setComment] = useState("");
const [friends, setFriends] = useState(0);
const [todayPosts, setTodayPosts] = useState(0);
  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/posts/allPosts"
      );
      setPosts(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = async () => {
    alert("Button Clicked");
if (friends === 0) {
  alert("You need at least one friend to create a post.");
  return;
}

if (friends === 1 && todayPosts >= 1) {
  alert("Posting limit reached. Only 1 post allowed today.");
  return;
}

if (friends === 2 && todayPosts >= 2) {
  alert("Posting limit reached. Only 2 posts allowed today.");
  return;
}
    try {
      const response = await axios.post(
        "http://localhost:5000/api/posts/createPost",
        {
          userId: "user1",
          caption,
          mediaUrl,
          mediaType,
        }
      );

      console.log(response.data);

      alert("Post Created Successfully");

      setCaption("");
      setMediaUrl("");
      setMediaType("image");

      fetchPosts();
    } catch (err: any) {
      console.log(err);

      if (err.response) {
        alert("Backend Error: " + err.response.data.message);
      } else if (err.request) {
        alert("Cannot connect to backend server");
      } else {
        alert("Something went wrong");
      }
    }
  };

  const likePost = async (id: string) => {
    try {
      await axios.put(`http://localhost:5000/api/posts/like/${id}`);
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  const sharePost = async (id: string) => {
    try {
      await axios.put(`http://localhost:5000/api/posts/share/${id}`);
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };
const addComment = async (id: string) => {
  try {
    await axios.put(
      `http://localhost:5000/api/posts/comment/${id}`,
      {
        user: "user1",
        comment: comment,
      }
    );

    alert("Comment Added Successfully");

    setComment("");

    fetchPosts();
  } catch (err) {
    console.log(err);
    alert("Failed to add comment");
  }
};
  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "100px auto",
        padding: "20px",
      }}
    >
        <h3>Number of Friends</h3>

<select
  value={friends}
  onChange={(e) => setFriends(Number(e.target.value))}
  style={{
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
  }}
>
  <option value={0}>0 Friends</option>
  <option value={1}>1 Friend</option>
  <option value={2}>2 Friends</option>
  <option value={11}>More than 10 Friends</option>
</select>
      <h1>🌍 Public Space</h1>

      <input
        type="text"
        placeholder="Caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
        }}
      />

      <input
        type="text"
        placeholder="Image / Video URL"
        value={mediaUrl}
        onChange={(e) => setMediaUrl(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
        }}
      />

      <select
        value={mediaType}
        onChange={(e) => setMediaType(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        <option value="image">Image</option>
        <option value="video">Video</option>
      </select>

      <button
        onClick={createPost}
        style={{
          width: "100%",
          padding: "12px",
          background: "blue",
          color: "white",
          border: "none",
          cursor: "pointer",
          marginBottom: "30px",
        }}
      >
        Create Post
      </button>

      <hr />

      <h2>Community Posts</h2>

      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.map((post: any) => (
          <div
            key={post._id}
            style={{
              border: "1px solid gray",
              marginTop: "20px",
              padding: "15px",
            }}
          >
            <h3>{post.caption}</h3>

            {post.mediaType === "image" ? (
              <img
                src={post.mediaUrl}
                alt=""
                width="100%"
              />
            ) : (
              <video
                src={post.mediaUrl}
                controls
                width="100%"
              />
            )}

            <br />
            <br />

            <button onClick={() => likePost(post._id)}>
              ❤️ Like ({post.likes})
            </button>

            <button
              style={{ marginLeft: "20px" }}
              onClick={() => sharePost(post._id)}
            >
              🔄 Share ({post.shares})
            </button>

            <h4>Comments</h4>

{post.comments.map((comment: any, index: number) => (
  <p key={index}>
    <b>{comment.user}</b> : {comment.comment}
  </p>
))}

<input
  type="text"
  placeholder="Write a comment..."
  value={comment}
  onChange={(e) => setComment(e.target.value)}
  style={{
    width: "100%",
    padding: "10px",
    marginTop: "10px",
  }}
/>

<button
  onClick={() => addComment(post._id)}
  style={{
    marginTop: "10px",
    padding: "8px 15px",
    background: "green",
    color: "white",
    border: "none",
    cursor: "pointer",
  }}
>
  Add Comment
</button>
          </div>
        ))
      )}
    </div>
  );
}