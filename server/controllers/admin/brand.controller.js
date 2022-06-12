const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { Brand, Drink } = require("../../models/models")

class BrandController {
  async add(req, res, next) {
    try {
      const { name } = req.body
      if (!name) {
        return res.status(404).json({ message: "Заполните все поля" })
      } else {
        const brand = await Brand.create({ name })
        res.json({ message: "Вы успешно создали бренд" })
      }
    } catch (error) {
      res.status(505).json({ message: "Ошибка при добавлении бренда" })
    }
  }
  async getAll(req, res, next) {
    try {
      const brands = await Brand.findAll()
      return res.json(brands)
    } catch (error) {
      res.status(505).json({ message: "Ошибка при получении бренда" })
    }
  }
  async edit(req, res, next) {
    try {
      const { id } = req.params
      const { name } = req.body
      const brand = await Brand.update({ name }, { where: { id } })
      res.json({ message: "Вы успешно изменили бренд" })
    } catch (error) {
      res.status(505).json({ message: "Ошибка при изменении бренда" })
    }
  }
  async delete(req, res, next) {
    try {
      const { id } = req.params
      const candidate = await Drink.findOne({ where: { brandId: id } })
      if (candidate) {
        res.status(505).json({ message: "Бренд имеет напитки" })
      } else {
        const brand = await Brand.destroy({ where: { id } })
        res.json({ message: "Вы успешно удалили бренд" })
      }
    } catch (error) {
      res.status(505).json({ message: "Ошибка при удалении" })
    }
  }
}

module.exports = new BrandController()
