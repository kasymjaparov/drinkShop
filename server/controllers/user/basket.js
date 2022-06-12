const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {
  Brand,
  Drink,
  Type,
  Coupon,
  Order,
  User,
  Basket_Drink,
} = require("../../models/models")

class BasketController {
  async add(req, res, next) {
    try {
      const { drinkId, amount } = req.body
      const userId = req.user.id
      if (!drinkId || !amount) {
        return res.status(404).json({ message: "Заполните все поля" })
      } else {
        const candidate = await Basket_Drink.findOne({
          where: { userId, drinkId },
        })
        if (candidate) {
          return res
            .status(404)
            .json({ message: "Данный товар уже в вашей корзине" })
        } else {
          const basketItem = await Basket_Drink.create({
            drinkId,
            amount,
            userId,
          })
          res.json({
            message: "Вы успешно занесли товар в корзину",
            basketItem,
          })
        }
      }
    } catch (error) {
      res
        .status(505)
        .json({ message: "Ошибка при добавлении напитка в корзину" })
    }
  }
  async getAll(req, res, next) {
    try {
      const id = req.user.id
      const user = await User.findOne({
        where: { id },
        include: [
          {
            model: Drink,
            attributes: {
              exclude: ["logo", "desc", "capacity", "brandId", "typeId"],
            },
          },
        ],
        attributes: { exclude: ["email", "id", "password", "role"] },
      })
      res.json({ drinks: user.drinks })
    } catch (error) {
      console.log(error.message)
      res
        .status(505)
        .json({ message: "Ошибка при получении напитков в корзине" })
    }
  }
  async delete(req, res, next) {
    try {
      const userId = req.user.id
      const { id } = req.params
      const deletedItem = await Basket_Drink.destroy({
        where: { userId, id },
      })
      res.json({ message: "Вы успешно удалили товар из корзины" })
    } catch (error) {
      console.log(error.message)
      res
        .status(505)
        .json({ message: "Ошибка при получении напитков в корзине" })
    }
  }
}

module.exports = new BasketController()
