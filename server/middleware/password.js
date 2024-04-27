const bcrypt = require('bcrypt');
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

module.exports = {
    encryptPassword: async (password) => {
        const hash = await bcrypt.hashSync(password, SALT_ROUNDS);
        return hash;
    },
    comparePassword: async (password, passwordHash) => {
        const isMatch = await bcrypt.compare(password, passwordHash);
        return isMatch;
    },
    hidePassword: async (req, res) => {  
        const {password, ...userObj} = res.user._doc;
        res.send(userObj);
    }
}