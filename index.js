import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const posts = []

app.get("/", (req, res) => {
    res.render("home", { posts: posts });
});

app.get('/post/:index', (req, res) => {
  const index = req.params.index;
  const post = posts[index];

  if (post) {
    res.render("post", { post: post });
  } else {
    res.send("Post not found.");
  }
});

app.post("/post", (req, res) => {
  const post = {
    title: req.body["title"],
    body: req.body["body"],
    date: new Date()
  }

  posts.push(post);

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

