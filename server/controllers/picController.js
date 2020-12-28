module.exports = {
    getProfilePic: async (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.params
        const profilePic = await db.picture.get_pic([user_id])
        res.status(200).send(profilePic[0].profile_pic)
    }
}