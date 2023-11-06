const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
module.exports = {
  encryptData: function (data, key) {
    let token = jwt.sign(data, key);
    return token;
  },
  decryptData: function (token, key) {
    let data = null;
    if (token !== null && token !== undefined && token !== "")
      data = jwt.verify(token, key);
    return data;
  },
  hashPassword: function (password, saltrounds) {
    let salt = bcrypt.genSaltSync(parseInt(saltrounds));
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
  },
  compareHash: async function (password, hash) {
    let res = await bcrypt.compare(password, hash);
    return res;
  },
};
