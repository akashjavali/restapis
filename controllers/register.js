const User = require('../models/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user, password } = req.body;
    if (!user || !password)
        return res
            .status(400)
            .json({ message: 'Username and password are required.' });
    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ user }).exec();
    if (duplicate) return res.sendStatus(409); //conflict
    try {
        //encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // create and store the new user
        const result = await User.create({
            user,
            password: hashedPassword,
        });
        console.log(result);
        res.status(201).json({ success: `New User ${user} created!` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { handleNewUser };
