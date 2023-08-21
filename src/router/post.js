import { Router } from "express";
import PostController from "../controller/post.js";
import commentController from "../controller/comments.js";
import likeController from "../controller/likes.js";

const postRouter = new Router();
postRouter.get("/posts", PostController.getAll);
postRouter.get("/post/:id", PostController.getSingle);

postRouter.put("/post/:id", PostController.update);

postRouter.post("/post", PostController.create);
postRouter.get("/post-delete/:id", PostController.delete);


postRouter.post("/comment/:id", commentController.add);
postRouter.get("/comments/:id", commentController.getAll);


postRouter.post("/likes/:id", likeController.updateLikes);


postRouter.get("/user-posts/:user_id",PostController.userPosts);



export default postRouter;
