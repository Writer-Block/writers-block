const bcrypt = require("bcrypt")
const nodemailer = require('nodemailer');
module.exports = {

    register: async (req, res) => {
        const db = req.app.get('db')
        const {username, password, email} = req.body
        const profile_pic = `https://robohash.org/${username}`
        const existingUser = await db.auth.check_user(username)
        if (existingUser[0]) {
          return res.status(409).send("User already exists with that username")
        }
        const existingEmail = await db.auth.check_email(email)
        if (existingEmail[0]){
            return res.status(409).send("User already exists with that email")
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const [newUser] = await db.auth.add_user([username, hash, email, profile_pic])

        req.session.user = newUser

        res.status(200).send(req.session.user)
    },

    login: async (req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body
        const [foundUser] = await db.auth.check_user(username)
        if(!foundUser){
            return res.status(401).send("Incorrect login information")
        }
        const authenticated = bcrypt.compareSync(password, foundUser.password)
        if( authenticated ){
            req.session.user = foundUser
            res.status(200).send(req.session.user)
        } else {
            res.status(401).send('Incorrect login information')
        }
    },

    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },

    getMe: async (req, res) => {
        if (req.session.user){
            const {user_id} = req.session.user    
            const db = req.app.get('db')
            const [me] = await db.auth.get_me(+user_id)
            res.status(200).send(me)
        }
    },

  deleteUser: async (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.session.user

        try {
            await db.auth.remove_user([+user_id])
            res.sendStatus(200)
        } catch(err) {
            console.log("Error in deleting account", err)
            res.sendStatus(500)
        }
      },
  
    emailer: async (req, res) => {
        const {email} = req.body;

        let transporter = nodemailer.createTransport({
            service: "outlook",
            auth: {
                user: "writers___block@outlook.com",
                pass: "Writersblock$"
            }
        });

        const options = {
            from: "writers___block@outlook.com",
            to: `${email}`,
            subject: "Welcome to Writers Block",
            text: "Welcome to Writers Block! You're ready to get and give advice, expand your writing skills, improve your novels, and interact with other authors. We're happy you joined. Enjoy."
        };

        const info = await transporter.sendMail(options);

        console.log("Message sent: ", info.messageId);
        res.status(200).send("Email sent");
    }
}