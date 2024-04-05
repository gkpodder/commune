const AccountService = require("../services/accountService");

getAllUsers = async(req, res) => {
    const allUsers = await AccountService.getAllUsers();
    res.send(allUsers);
}

signInUser = async(req, res) => {
    try {
        const {email} = req.body;
        if (!email) {
            return res.status(400).send("provide a valid email");
        }

        const signInResult = await AccountService.signIn(email);

        res.send(signInResult);
    } catch (error) {
        console.error("Error loggin in user:", error);
        res.status(500).send("Error logging in user");
    }
}

signUpUser = async(req, res) => {
    try {
        const {email} = req.body;
        if (!email) {
            return res.status(400).send("Email are required");
        }

        const signUpResult = await AccountService.signUp(email);

        res.send(signUpResult);
    } catch (error) {
        console.error("Error creating new user:", error);
        res.status(500).send("Error logging in user");
    }
}

module.exports = {
    getAllUsers,
    signInUser,
    signUpUser
}