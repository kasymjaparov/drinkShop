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
} = require("../../models/models")

class CouponController {
  async add(req, res, next) {
    try {
      const { sum } = req.body
      if (!sum) {
        return res.status(404).json({ message: "Заполните все поля" })
      } else {
       
        const coupon = await Coupon.create({ sum, id: uuid4() })
        res.json({ message: "Вы успешно создали купон" })
      }
    } catch (error) {
      res.status(505).json({ message: "Ошибка при добавлении купона" })
    }
  }
  async getAll(req, res, next) {
    try {
      const coupons = await Coupon.findAll({
        include: [
          { model: User, attributes: ["email"] },
          { model: Order, attributes: ["id"] },
        ],
      })
      return res.json(coupons)
    } catch (error) {
      res.status(505).json({ message: "Ошибка при получении купонов" })
    }
  }
  async setCouponToMe(req, res, next) {
    try {
      const { id } = req.body
      const coupon = await Coupon.update(
        { userId: req.user.id },
        { where: { id } }
      )

      res.json({ message: "Вы успешно добавили этот купон к себе" })
    } catch (error) {
      res.status(505).json({ message: "Ошибка при изменении купона" })
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params
      const coupon = await Coupon.destroy({ where: { id } })
      res.json({ message: "Вы успешно удалили купон" })
    } catch (error) {
      res.status(505).json({ message: "Ошибка при удалении купона" })
    }
  }

  async getCouponsByUser(req, res, next) {
    try {
      const coupons = await Coupon.findAll({
        include: [
          { model: User, attributes: ["email"], where: { id: req.user.id } },
          { model: Order, attributes: ["id"] },
        ],
      })
      res.json({ coupons })
    } catch (error) {
      res
        .status(505)
        .json({ message: "Ошибка при получении купонов пользователя" })
    }
  }
}

module.exports = new CouponController()
