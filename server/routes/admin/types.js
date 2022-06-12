const Router = require("express")
const router = new Router()
const roleMiddleware = require("../../middleware/roleMiddleware")
const typeController = require("../../controllers/admin/type.controller")

router.post("/add", roleMiddleware("admin"), typeController.add)
router.get("/getAll", typeController.getAll)
router.put("/edit/:id", roleMiddleware("admin"), typeController.edit)
router.delete("/delete/:id", roleMiddleware("admin"), typeController.delete)

module.exports = router
