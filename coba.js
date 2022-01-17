const jwt = require("jsonwebtoken");

function generateAccessToken(username) {
  return jwt.sign({
    id: username,
    exp: 1800,
    iat: Math.floor(Date.now())
  },
  "krisnaGAY");
}

console.log(generateAccessToken("KRISNAKNTL"));
console.log((Date.now() / 1000) + (60 * 2));
