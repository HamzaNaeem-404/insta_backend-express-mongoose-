import { Router } from "express";
import PostController from "../controller/post.js";
import commentController from "../controller/comments.js";
import likeController from "../controller/likes.js";
import loginAuth from "../middleware/loginAuthorization.js";
import roleAuth from "../middleware/roleAuthorization.js";
import postValidator from "../validator/validatePost.js";

const postRouter = new Router();

postRouter.get("/posts/:perPage/:limit", loginAuth, roleAuth, PostController.getAll);
postRouter.get("/post/:id", PostController.getSingle);

postRouter.put("/post/:id", PostController.update);

postRouter.post("/post", loginAuth, postValidator.create, PostController.create);

postRouter.get("/post-delete/:id", PostController.delete);


postRouter.post("/comment/:id", commentController.add);
postRouter.get("/comments/:id", commentController.getAll);


postRouter.post("/likes/:id", likeController.updateLikes);

//User All posts
postRouter.get("/user-posts/:user_id",PostController.userPosts);


postRouter.get("/recent-posts/",PostController.recentPosts);

//Posts from Email
postRouter.get("/email-posts/:email",PostController.emailPosts);

//Search Posts from any word given in title and description
postRouter.get("/search/:query", PostController.searchPosts);



export default postRouter;
