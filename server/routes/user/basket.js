const Router = require("express")
const router = new Router()
const roleMiddleware = require("../../middleware/roleMiddleware")
const basketController = require("../../controllers/user/basket")

router.post("/add", roleMiddleware("user"), basketController.add)
router.get("/getAll", roleMiddleware("user"), basketController.getAll)
router.delete("/delete/:id", roleMiddleware("user"), basketController.delete)

module.exports = router
