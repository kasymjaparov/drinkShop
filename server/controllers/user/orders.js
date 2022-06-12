const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const uuid4 = require("uuid4")
const {
  Brand,
  Drink,
  Type,
  Coupon,
  Order,
  User,
  Order_Drink,
} = require("../../models/models")

class OrdersController {
  async add(req, res, next) {
    try {
      const { drinkId, amount } = req.body
      if (!amount || !drinkId) {
        return res.status(404).json({ message: "Заполните все поля" })
      } else {
        const coupon = await Order_Drink.create({ drinkId, amount })
        res.json({ message: "Вы успешно создали купон" })
      }
    } catch (error) {
      res.status(505).json({ message: "Ошибка при добавлении купона" })
    }
  }
}

module.exports = new OrdersController()
