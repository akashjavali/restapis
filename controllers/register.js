const User = require('../models/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
        return res
            .status(400)
            .json({ message: 'Username and password are required.' });
    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ username }).exec();
    if (duplicate) return res.sendStatus(409); //conflict
    try {
        //encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // create and store the new user
        const result = await User.create({
            username,
            password: hashedPassword,
        });
        console.log(result);
        res.status(201).json({ success: `New User ${username} created!` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const handleUpdateUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
        return res
            .status(400)
            .json({ message: 'Username and password are required.' });
    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ username }).exec();
    if (duplicate) return res.sendStatus(409); //conflict
    try {
        //encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // create and store the new user
        const result = await User.updateOne(
            {
                _id: req.params.userId,
            },
            {
                username,
                password: hashedPassword,
            }
        );
        console.log(result);
        res.status(201).json({ success: `User ${username} updated!` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { handleNewUser, handleUpdateUser };
