const Router = require("express")
const router = new Router()
const roleMiddleware = require("../../middleware/roleMiddleware")
const drinkController = require("../../controllers/admin/drink.controller")

router.post("/add", roleMiddleware("admin"), drinkController.add)
router.post("/receipt", roleMiddleware("admin"), drinkController.receiptDrink)
router.get("/getAll", drinkController.getAll)
router.get("/getById/:id", drinkController.getById)
router.get("/getByPagination", drinkController.getPaginated)
router.get("/getByFilter", drinkController.getFilteredDrinks)

module.exports = router
