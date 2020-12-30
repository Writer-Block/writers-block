module.exports = {
    //# For getting all the posts on the Dash - cs
    getAllPosts: async (req, res) => {
        const db = req.app.get('db')
        const posts = await db.post.get_all_posts()
        res.status(200).send(posts)
    },

    getUserPosts: async (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.session.user;
        console.log(user_id);
      
        const userPosts = await db.user_posts.get_user_posts(+user_id);
        return res.status(200).send(userPosts);
      },
    addPost: async (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.session.user
        const {content} = req.body
  
        try {
            await db.post.add_post([+user_id, content])
            res.sendStatus(200)
        } catch(err) {
            console.log("Error in adding post", err)
            res.sendStatus(404)
        }
    },
  
      editUserPost: async (req, res) => {
        const db = req.app.get('db');
        const {post_id} = req.params;
        
        const {content} = req.body;

        const newpost = await db.user_posts.edit_user_post([post_id, content]);
        return res.status(200).send(newpost);
      },

      deletePost: async (req, res) => {
        const db = req.app.get('db');
        const {post_id} = req.params;

        // delete all comments
        await db.user_posts.delete_comments([post_id]);

        // delete the post
        await db.user_posts.delete_post([post_id]);
        return res.status(200).send("deleted");
      },
}