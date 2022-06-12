const Router = require("express")
const router = new Router()
const authRouter = require("./auth")
const brandRouter = require("./admin/brand")
const typeRouter = require("./admin/types")
const couponRouter = require("./admin/coupons")
const drinkRouter = require("./admin/drink")
const basketRouter = require("./user/basket")
const orderRouter = require("./user/orders")

router.use("/auth", authRouter)
router.use("/brand", brandRouter)
router.use("/type", typeRouter)
router.use("/coupon", couponRouter)
router.use("/drink", drinkRouter)
router.use("/basket", basketRouter)
router.use("/userOrders", orderRouter)

module.exports = router
