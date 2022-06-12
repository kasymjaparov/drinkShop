const jwt = require("jsonwebtoken")

module.exports = function (req, res, next) {
  const token = req.headers.authorization
  console.log(token)
  jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
    if (error) {
      if (error.message.includes("jwt expired")) {
        return res.status(400).json({
          message:
            "Срок действия токена истек.Попробуйте заново войти в свой аккаунт",
        })
      } else {
        return res.status(400).json({ message: "Неверный токен" })
      }
    } else {
      req.user=decoded
      next()
    }
  })
}
