"use client";

import React from "react";

export default function DashboardPage() {
  const [loading, setLoading] = React.useState(true);
  const [posts, setPosts] = React.useState([]);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/admin/posts", {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>Posts</h2>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <ul>
          {posts.map((post, index) => (
            <li key={index}>
              <strong>{post.name}</strong> ({post.email}) -{" "}
              <a href={post.website} target="_blank" rel="noopener noreferrer">
                {post.website}
              </a>
              <p>{post.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
