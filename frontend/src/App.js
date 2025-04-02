import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [feed, setFeed] = useState([]);
  const [topUsers, setTopUsers] = useState([]);
  const [trendingPosts, setTrendingPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/posts/feed")
      .then((response) => {
        console.log("Feed Data:", response.data);
        setFeed(response.data.posts);
      })
      .catch((error) => console.error("Error fetching feed:", error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users/top")
      .then((response) => setTopUsers(response.data))
      .catch((error) => console.error("Error fetching top users:", error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/posts/trending")
      .then((response) => setTrendingPosts(response.data))
      .catch((error) => console.error("Error fetching trending posts:", error));
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 fw-bold">📊 Social Media Analytics</h1>

      {/* Top Users Section */}
      <h2 className="mt-4">🏆 Top Users</h2>
      <div className="row">
        {topUsers.map((user) => (
          <div key={user.id} className="col-md-4">
            <div className="card shadow-sm p-3 mb-3 rounded">
              <div className="card-body text-center">
                <h5 className="card-title fw-bold">{user.name}</h5>
                <p className="card-text">
                  <span className="badge bg-primary">Posts: {user.postCount}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trending Posts Section */}
      <h2 className="mt-4">🔥 Trending Posts</h2>
      <div className="row">
        {trendingPosts.map((post) => (
          <div key={post.id} className="col-md-6">
            <div className="card shadow-sm p-3 mb-3 rounded">
              <div className="card-body">
                <h5 className="card-title">"{post.content}"</h5>
                <p className="card-text">
                  <span className="badge bg-danger">💬 {post.comments} comments</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Live Feed Section */}
      <h2 className="mt-4">📰 Live Feed</h2>
      <div className="row">
        {feed.map((post) => (
          <div key={post.id} className="col-md-6">
            <div className="card shadow-sm p-3 mb-3 rounded">
              <div className="card-body">
                <p className="card-text">📢 {post.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
