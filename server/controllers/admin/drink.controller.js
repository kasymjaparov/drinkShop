const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { Brand, Drink, Type, History } = require("../../models/models")
const Sequelize = require("sequelize")
const Op = Sequelize.Op

class TypeController {
  async add(req, res, next) {
    try {
      const { name, brandId, capacity, logo, desc, price, amount, typeId } =
        req.body
      if (
        !name ||
        !brandId ||
        !capacity ||
        !logo ||
        !desc ||
        !price ||
        !amount ||
        !typeId
      ) {
        return res.status(404).json({ message: "Заполните все поля" })
      } else {
        const drink = await Drink.create({
          name,
          brandId,
          capacity,
          logo,
          desc,
          price,
          amount,
          typeId,
        })
        res.json({ message: "Вы успешно создали напиток" })
      }
    } catch (error) {
      res.status(505).json({ message: "Ошибка при добавлении напитка" })
    }
  }

  async getAll(req, res, next) {
    try {
      const drinks = await Drink.findAll({
        include: [
          { model: Brand, attributes: ["name"] },
          { model: Type, attributes: ["name"] },
        ],
      })
      return res.json(drinks)
    } catch (error) {
      res.status(505).json({ message: "Ошибка при получении напитков" })
    }
  }
  async getById(req, res, next) {
    try {
      const { id } = req.params
      const drink = await Drink.findOne({
        include: [
          { model: Brand, attributes: ["name"] },
          { model: Type, attributes: ["name"] },
        ],
        where: { id },
      })
      return res.json(drink)
    } catch (error) {
      res.status(505).json({ message: "Ошибка при получении напитка" })
    }
  }
  async getPaginated(req, res, next) {
    try {
      const { page = 1, limit = 1 } = req.query

      let offset = 0 + (page - 1) * limit
      const drinks = await Drink.findAll({
        include: [
          { model: Brand, attributes: ["name"] },
          { model: Type, attributes: ["name"] },
        ],
        limit: limit,
        offset: offset,
      })
      const total = await Drink.count()
      return res.json({ drinks, total })
    } catch (error) {
      console.log(error.message)
      res.status(505).json({ message: "Ошибка при получении напитков" })
    }
  }
  async getFilteredDrinks(req, res, next) {
    try {
      const { page = 1, limit = 1, type = "", drinkName = "" } = req.query

      let offset = 0 + (page - 1) * limit
      const drinks = await Drink.findAll({
        include: [
          { model: Brand, attributes: ["name"] },
          {
            model: Type,
            attributes: ["name"],
            where: { name: { [Op.iLike]: `%${type}%` } },
          },
        ],
        where: { name: { [Op.iLike]: `%${drinkName}%` } },
        limit: limit,
        offset: offset,
        order: ["id", "desc"],
      })
      const total = await Drink.count({
        include: [
          {
            model: Type,
            where: { name: { [Op.like]: `%${type}%` } },
          },
        ],
        where: { name: { [Op.like]: `%${drinkName}%` } },
        limit: limit,
        offset: offset,
      })
      return res.json({ drinks, total })
    } catch (error) {
      console.log(error.message)
      res.status(505).json({ message: "Ошибка при получении напитков" })
    }
  }
  async edit(req, res, next) {
    try {
      const { id } = req.params
      const { name } = req.body
      const type = await Type.update({ name }, { where: { id } })
      res.json({ message: "Вы успешно изменили тип" })
    } catch (error) {
      res.status(505).json({ message: "Ошибка при изменении типа" })
    }
  }
  async receiptDrink(req, res, next) {
    try {
      const { drinkId, amount, isComing, date } = req.body
      if (!drinkId || !amount || !isComing || !date) {
        return res.status(404).json({ message: "Заполните все поля" })
      } else {
        const candidateAmount = await Drink.findOne({
          where: { id: drinkId },
        })
        await Drink.update(
          { amount: candidateAmount.amount + amount },
          { where: { id: drinkId } }
        )
        const history = await History.create({
          drinkId,
          amount,
          isComing,
          date,
        })
        res.json({ message: "Вы успешно добавили количество напитка", history })
      }
    } catch (error) {
      console.log(error.message)
      res.status(505).json({ message: "Ошибка при добавлении количества" })
    }
  }
  async delete(req, res, next) {
    try {
      const { id } = req.params
      const candidate = await Drink.findOne({ where: { typeId: id } })
      if (candidate) {
        res.status(505).json({ message: "Тип имеет напитки" })
      } else {
        const brand = await Type.destroy({ where: { id } })
        res.json({ message: "Вы успешно удалили тип" })
      }
    } catch (error) {
      res.status(505).json({ message: "Ошибка при удалении типа" })
    }
  }
}

module.exports = new TypeController()
