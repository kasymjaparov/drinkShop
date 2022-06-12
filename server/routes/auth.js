const Router = require("express")
const router = new Router()
const userController = require("../controllers/auth.controller.js")

router.post("/login", userController.login)

router.post("/reg", userController.registration)

router.get("/getRole", userController.getRole)

module.exports = router
