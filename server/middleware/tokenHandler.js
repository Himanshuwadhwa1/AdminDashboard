const jwt = require("jsonwebtoken")

const tokenHandler = (req, res, next) => {
    const token = req.header("Authorization");
    const words = token.split(" ");
    const jwtToken = words[1];
    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
        req.admin = decoded.id;
        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: "Token is not valid" });
    }
};

module.exports = tokenHandler;
