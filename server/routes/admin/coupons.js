const Router = require("express")
const router = new Router()
const roleMiddleware = require("../../middleware/roleMiddleware")
const couponController = require("../../controllers/admin/coupon.controller")

router.post("/add", roleMiddleware("admin"), couponController.add)
router.post(
  "/setCouponToMe",
  roleMiddleware("user"),
  couponController.setCouponToMe
)
router.get(
  "/getMyCoupons",
  roleMiddleware("user"),
  couponController.getCouponsByUser
)
router.get("/getAll", roleMiddleware("admin"), couponController.getAll)
router.delete("/delete/:id", roleMiddleware("admin"), couponController.delete)

module.exports = router
