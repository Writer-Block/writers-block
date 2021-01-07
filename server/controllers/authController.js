const bcrypt = require("bcrypt")
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const crypto = require('crypto');

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

        let transporter = nodemailer.createTransport(smtpTransport({
            service: "gmail",
            auth: {
                user: "writersblockdawgs@gmail.com",
                pass: "Writersblock$"
            }
        }));

        const options = {
            from: "writersblockdawgs@gmail.com",
            to: `${email}`,
            subject: "Welcome to Writers Block",
            text: "Welcome to Writers Block! You're ready to get and give advice, expand your writing skills, improve your novels, and interact with other authors. We're happy you joined. Enjoy."
        };

        const info = await transporter.sendMail(options);

        console.log("Message sent: ", info.messageId);
        res.status(200).send("Email sent");
    },

    forgotPassword: async (req, res) => {
        const db = req.app.get('db')

        const {email} = req.body;

        //check if email is valid
        const newemail = await db.auth.check_email([email])

        if(!newemail[0]){
            res.status(404).send("Email not recognized")
        }
        //if valid 
        else {
            // create a random token 
            const token = crypto.randomBytes(20).toString('hex');
            //add token to users db 
            await db.auth.add_forgot_password([token, email]);
            console.log(token);

            const passTransporter = nodemailer.createTransport(smtpTransport({
                service: "gmail",
                auth: {
                    user: "writersblockdawgs@gmail.com",
                    pass: "Writersblock$"
                }
            }));

            const mailOptions = {
                from: "writersblockdawgs@gmail.com",
                to: `${email}`,
                subject: 'Reset Password',
                html: ' <p>You are receiving this because you (or someone else) have requested the reset of the password for your account. Please click on the following link, or paste into your browser to complete the process. Please click on the following link, or paste into your browser to complete the process.If you did not request this, please ignore this email and your password will remain unchanged.</p>'+
                    '<p>Click <a href="http://writersblock.xyz/#/reset/' + token + '">here</a> to reset your password</p>' 
            }

            const info = await passTransporter.sendMail(mailOptions);

            console.log("Message sent: ", info.messageId);
            res.status(200).send("Email sent");
        }
        
    },

    resetPassword: async (req,res) => {
        const db = req.app.get('db')
        const {passwordtoken} = req.params;
        const {password} = req.body;

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const user = await db.auth.edit_password([passwordtoken, hash]);
        return res.status(200).send(user);
    }
}