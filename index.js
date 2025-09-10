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

app.get("/post/:index", (req, res) => {
  const index = req.params.index;
  const post = posts[index];

  if (post) {
    res.render("post", { post: post, index: index });
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

app.post("/post/:index/delete", (req, res) => {
  const index = req.params.index;
  posts.splice(index, 1);

  res.redirect("/");
});

app.get("/post/:index/edit", (req, res) => {
  const index = req.params.index;
  const post = posts[index];
  res.render("edit", { post: post, index: index });
});

app.post("/post/:index/edit", (req, res) => {
  const index = req.params.index;

  posts[index].title = req.body["title"];
  posts[index].body = req.body["body"];

  res.redirect("/post/" + index);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
