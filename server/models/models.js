const sequelize = require("../db")
const { DataTypes } = require("sequelize")
const uuid4 = require("uuid4")

const User = sequelize.define(
  "user",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING },
  },
  { timestamps: false }
)
const Drink = sequelize.define(
  "drink",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, defaultValue: false, unique: true },
    capacity: { type: DataTypes.DOUBLE },
    logo: { type: DataTypes.TEXT },
    desc: { type: DataTypes.TEXT },
    price: { type: DataTypes.INTEGER },
    amount: { type: DataTypes.INTEGER },
  },
  { timestamps: false }
)
const Type = sequelize.define(
  "type",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true },
  },
  { timestamps: false }
)
const Brand = sequelize.define(
  "brand",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true },
  },
  { timestamps: false }
)
const Coupon = sequelize.define("coupon", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  isUsed: { type: DataTypes.BOOLEAN, defaultValue: false },
  sum: { type: DataTypes.INTEGER },
})

const History = sequelize.define("history", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  isComing: { type: DataTypes.BOOLEAN },
  amount: { type: DataTypes.INTEGER },
  date: { type: DataTypes.DATE },
})

const Order = sequelize.define(
  "order",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    sum: { type: DataTypes.INTEGER },
    date: { type: DataTypes.DATE },
    isDone: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { timestamps: false }
)

const Order_Drink = sequelize.define(
  "order_drink",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    amount: { type: DataTypes.INTEGER },
  },
  { timestamps: false }
)

const Basket_Drink = sequelize.define(
  "basket_drink",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    amount: { type: DataTypes.INTEGER },
  },
  { timestamps: false }
)
//relations

Brand.hasMany(Drink, { onDelete: "cascade", onUpdate: "cascade" })
Drink.belongsTo(Brand)

Type.hasMany(Drink, { onDelete: "cascade", onUpdate: "cascade" })
Drink.belongsTo(Type)

User.hasMany(Coupon)
Coupon.belongsTo(User)

Drink.hasMany(History)
History.belongsTo(Drink)

User.hasMany(Order)
Order.belongsTo(User)

Order.hasMany(Coupon)
Coupon.belongsTo(Order)

Order.belongsToMany(Drink, { through: Order_Drink })
Drink.belongsToMany(Order, { through: Order_Drink })

User.belongsToMany(Drink, { through: Basket_Drink })
Drink.belongsToMany(User, { through: Basket_Drink })

module.exports = {
  User,
  Coupon,
  Drink,
  Brand,
  Type,
  Order,
  History,
  Basket_Drink,
  Order_Drink,
}
