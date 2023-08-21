import postModel from "../model/Post.js";
const PostController = {
  getAll: async (req, res) => {
    const posts = await postModel.find().populate("user_id");
    return res.json({ posts });
  },
  getSingle: async (req, res) => {
    const { id } = req.params;
    const post = await postModel.findById(id).populate("user_id");
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.json(post);
  },
  create: async (req, res) => {
    const body = req.body;
    const post = await postModel.create({
      title: body.title,
      description: body.description,
      user_id: body.user_id,
    });

    return res.json({ message: "Post created", post });
  },

  update: async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    const post = await postModel.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (body.title) { post.title = body.title; }

    if (body.description) { post.description = body.description; }

    await post.save();
    return res.json({ message: "Post Updated", post });
  },

  delete: async (req, res) => {
    const id = req.params.id;
    const user = await postModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Post not found" });
    }
    await postModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Post deleted" });
  },

  userPosts: async (req, res) => {

    try {
      const user_id = req.params.user_id;
      // console.log(id)
      const post = await postModel.find({user_id});
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      return res.json(post);
    }
    catch (e) {
      console.log(e, "error")
    }
  },

};

export default PostController;