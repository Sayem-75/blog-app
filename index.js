import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

const posts = []

app.get("/", (req, res) => {
    // res.send("Project initialized successfully.");
    res.render("home.ejs", { posts: posts });
})

app.post("/post", (req, res) => {
  const post = {
    title: req.body["title"],
    body: req.body["body"]
  }

  posts.push(post);

  res.redirect("/");
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});



