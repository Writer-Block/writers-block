module.exports = {
    getComments: async (req, res) => {
        const db = req.app.get('db')
        const {postId} = req.params
        const allComments = await db.comment.get_comments(postId)
        res.status(200).send(allComments)
    },

    addComment: async (req, res) => {
        const db = req.app.get('db')
        const {postId} = req.params
        const {comment} = req.body
  
        try {
            await db.comment.add_comment([+postId, comment])
            res.sendStatus(200)
        } catch(err) {
            console.log("Error in adding comment", err)
            res.sendStatus(404)
        }
    }
}