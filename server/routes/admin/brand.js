const Router = require("express")
const router = new Router()
const roleMiddleware = require("../../middleware/roleMiddleware")
const brandController = require("../../controllers/admin/brand.controller")

router.post("/add", roleMiddleware("admin"), brandController.add)
router.get("/getAll", brandController.getAll)
router.put("/edit/:id", roleMiddleware("admin"), brandController.edit)
router.delete("/delete/:id", roleMiddleware("admin"), brandController.delete)

module.exports = router
