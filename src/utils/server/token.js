const jwt = require('jsonwebtoken');
const config = require('../../../config/config');

class JwtHelper {
  // 构造函数接受一个密钥参数
  constructor(secret) {
    this.secret = secret;
  }

  // 生成一个新的 JWT
  generateToken(payload, options) {
    return jwt.sign(payload, this.secret, options);
  }

  // 验证并解密 JWT
  verifyToken(token, options) {
    try {
      const decoded = jwt.verify(token, this.secret, options);
      return { success: true, data: decoded };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }
}

module.exports =  new JwtHelper(config.JWT_KEY);
