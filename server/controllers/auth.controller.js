const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { User } = require("../models/models")

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  })
}

class AuthController {
  async registration(req, res, next) {
    try {
      const { email, password, role } = req.body
      if (!email || !password || !role) {
        return res.status(500).json({ message: "Заполните все поля" })
      }
      const candidate = await User.findOne({ where: { email } })
      if (candidate) {
        return res
          .status(505)
          .json({ message: "Пользователь с таким email уже существует" })
      }
      const hashPassword = await bcrypt.hash(password, 5)
      const user = await User.create({ email, role, password: hashPassword })
      const token = generateJwt(user.id, user.email, role)
      return res.json({ token })
    } catch (error) {
      res.status(505).json(error.message)
    }
  }

  async login(req, res, next) {
    const { email, password } = req.body
    if (!email || !password) {
      return res
        .status(500)
        .json({ message: "Некорректный email или password" })
    }
    const user = await User.findOne({ where: { email } })
    console.log(user, email)
    if (!user) {
      return res.status(404).json("Пользователь не найден")
    }
    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return res.status(404).json("Указан неверный пароль")
    }
    const token = generateJwt(user.id, user.email, user.role)
    return res.json({ token, role: user.role, email: user.email })
  }

  async getRole(req, res, next) {
    try {
      const token = req.headers.authorization
      const decoded = jwt.verify(token, process.env.SECRET_KEY)
      return res.json({ role: decoded.role })
    } catch (error) {
      res.status(505).json({ message: "Ошибка при получении роли" })
    }
  }
}

module.exports = new AuthController()
