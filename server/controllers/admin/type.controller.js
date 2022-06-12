const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { Brand, Drink, Type } = require("../../models/models")

class TypeController {
  async add(req, res, next) {
    try {
      const { name } = req.body
      if (!name) {
        return res.status(404).json({ message: "Заполните все поля" })
      } else {
        const type = await Type.create({ name })
        res.json({ message: "Вы успешно создали тип" })
      }
    } catch (error) {
      console.log(error.message)
      res.status(505).json({ message: "Ошибка при добавлении типа" })
    }
  }
  async getAll(req, res, next) {
    try {
      const types = await Type.findAll()
      return res.json(types)
    } catch (error) {
      res.status(505).json({ message: "Ошибка при получении типа" })
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
