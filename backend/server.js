const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); 
const users = [
  { id: 1, name: "Alice", postCount: 20 },
  { id: 2, name: "Bob", postCount: 15 },
  { id: 3, name: "Charlie", postCount: 10 },
  { id: 4, name: "David", postCount: 8 },
  { id: 5, name: "Eve", postCount: 5 },
];

const posts = [
  { id: 1, content: "Hello World!", comments: 10 },
  { id: 2, content: "React is awesome!", comments: 20 },
  { id: 3, content: "I love coding!", comments: 25 },
];
app.get("/users/top", (req, res) => {
  const sortedUsers = users.sort((a, b) => b.postCount - a.postCount).slice(0, 5);
  res.json(sortedUsers);
});

app.get("/posts/trending", (req, res) => {
  const maxComments = Math.max(...posts.map(post => post.comments));
  const trendingPosts = posts.filter(post => post.comments === maxComments);
  res.json(trendingPosts);
});


app.get("/posts", (req, res) => {
  res.json(posts.reverse()); 
});

app.get("/posts/feed", (req, res) => {
  res.json({ message: "Feed data will be here", posts });
});


app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
