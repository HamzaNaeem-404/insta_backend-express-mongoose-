import postModel from "../model/Post.js";
const PostController = {
  getAll: async (req, res) => {
    const {perPage, limit} = req.params;
    const posts = await postModel.find().sort("-createdAt").skip((perPage-1)*limit).limit(limit).populate("user_id", "-password");

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
    try{
    const {title, description} = req.body;
    
    const user_id = req.user._id;
    const post = await postModel.create({title, description, user_id});

    if(!post){
      return res.status(400).json({message: "Post creation error"})
    }
  
    return res.status(200).json({ message: "Post created", post });
  }
  catch(error){
    return res.status(500),json({message: "Internal Server Error", error: error})
  }
  
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
  recentPosts: async (req, res) => {

    try {
      const currentDate = new Date(); 
      currentDate.setHours(0,0,0,0);
      console.log(currentDate);
      const post = await postModel.find({createdAt: {
        $gte: currentDate
        // $lt: "2023-08-25"
        // $eq: "2023-08-27"
      }});
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      return res.json(post);
    }
    catch (e) {
      console.log(e, "error")
    }
  },

  emailPosts: async (req, res) => {
    try {
      const email = req.params.email;
  
      const posts = await postModel.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "user"
          }
        },
        {
          $match: {
            "user.email": email
          }
        },
        {
          $project: {
            "user.user_password": 0 // eliminating password
          }
        }
      ]);
  
      console.log(posts);
      res.status(200).json(posts); // Send the posts as a response
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  },

  searchPosts: async (req, res)=> {
    try {
      const query = req.params.query;
      
      const pattern = new RegExp(query, 'i');
      
      const results = await postModel.find({
        $or: [
          { title: { $regex: pattern } },
          { description: { $regex: pattern } },
        ],
      });
      
      res.json(results); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  }
  
  // searchPosts: async (req, res)=> {
  //     try {
  //       const query = req.params.query;
        
  //       const pattern = new RegExp(query, 'i');
        
  //       const results = await postModel.find({
  //         $or: [
  //           { title: { $regex: pattern } },
  //           { description: { $regex: pattern } },
  //         ],
  //       });
        
  //       res.json(results); 
  //     } catch (error) {
  //       console.error(error);
  //       res.status(500).json({ error: 'An error occurred' });
  //     }
    

  //   const posts = await postModel.aggregate([
  //     {
  //       $lookup: {
  //         from: "users",
  //         localField: "user_id",
  //         foreignField: "_id",
  //         as: "user"
  //       }
  //     },
  //     {
  //       $match: {
  //         "user.email": email
  //       }
  //     },
  //     {
  //       $project: {
  //         "user.user_password": 0 // eliminating password
  //       }
  //     }
  //   ]);

  //   console.log(posts);
  //   res.status(200).json(posts); // Send the posts as a response
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ message: "An error occurred" });
  // }

};

export default PostController;
