const Router = require("express")
const router = new Router()
const roleMiddleware = require("../../middleware/roleMiddleware")
const orderController = require("../../controllers/user/orders")

router.post("/add", roleMiddleware("user"), orderController.add)
// router.get("/getAll", roleMiddleware("user"), orderController.getAll)
// router.delete("/delete/:id", roleMiddleware("user"), orderController.delete)

module.exports = router
