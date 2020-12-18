module.exports = {
    //# For getting all the posts on the Dash - cs
    getAllPosts: async (req, res) => {
        const db = req.app.get('db')
        const posts = await db.get_all_posts()
        res.status(200).send(posts)
    },
}