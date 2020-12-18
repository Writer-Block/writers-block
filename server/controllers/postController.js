module.exports = {
    //# For getting all the posts on the Dash - cs
    getAllPosts: async (req, res) => {
        const db = req.app.get('db')
        const posts = await db.post.get_all_posts()
        res.status(200).send(posts)
    },

    getUserPosts: async (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.params;
        console.log(user_id);
      
        const userPosts = await db.user_posts.get_user_posts([user_id]);
        return res.status(200).send(userPosts);
      }
}